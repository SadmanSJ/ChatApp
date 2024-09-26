import { ChatRoomAccessIF } from "@/interface";
import { MongoClient, ObjectId } from "mongodb";
import {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "next-auth/adapters";

interface NewAdapterUser extends AdapterUser {
  _id: string;
  password: string;
  role: string;
  isVerified: boolean;
  chatRoomAccess: ChatRoomAccessIF[];
}

const clientPromise = new MongoClient(process.env.MONGODB_URI!).connect();

export function MongoDBAdapter(): Adapter {
  return {
    async createUser(user) {
      const client = await clientPromise;
      const db = client.db();

      const newUser = {
        ...user,
        _id: new ObjectId(), // MongoDB _id
        emailVerified: user.emailVerified ?? null,
        isVerified: true,
        role: "user",
      };

      const result = await db.collection("users").insertOne(newUser);
      return { id: result.insertedId.toString(), ...newUser };
    },

    async getUser(id: string): Promise<NewAdapterUser | null> {
      const client = await clientPromise;
      const db = client.db();

      const user = (await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) })) as NewAdapterUser | null;
      if (!user) return null;

      return {
        ...user,
        id: user._id.toString(),
      };
    },

    async getUserByEmail(email): Promise<NewAdapterUser | null> {
      const client = await clientPromise;
      const db = client.db();

      const user = (await db
        .collection("users")
        .findOne({ email })) as NewAdapterUser | null;
      if (!user) return null;

      return {
        ...user,
        id: user._id.toString(),
      };
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<NewAdapterUser | null> {
      const client = await clientPromise;
      const db = client.db();

      const account = await db
        .collection("accounts")
        .findOne({ providerAccountId, provider });

      if (!account) return null;

      const user = (await db
        .collection("users")
        .findOne({ _id: account.userId })) as NewAdapterUser | null;

      if (!user) return null;

      return {
        ...user,
        id: user._id.toString(),
      };
    },

    async updateUser(user): Promise<any> {
      const client = await clientPromise;
      const db = client.db();

      const { id, ...rest } = user;
      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: rest });

      return {
        ...user,
      };
    },

    async deleteUser(userId) {
      const client = await clientPromise;
      const db = client.db();

      await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    },

    async linkAccount(account) {
      const client = await clientPromise;
      const db = client.db();

      const newAccount = {
        ...account,
        _id: new ObjectId(),
        userId: new ObjectId(account.userId),
      };

      await db.collection("accounts").insertOne(newAccount);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const client = await clientPromise;
      const db = client.db();

      await db
        .collection("accounts")
        .deleteOne({ providerAccountId, provider });
    },

    async createSession({ sessionToken, userId, expires }) {
      const client = await clientPromise;
      const db = client.db();

      const session = {
        _id: new ObjectId(),
        sessionToken,
        userId: new ObjectId(userId),
        expires,
      };

      await db.collection("sessions").insertOne(session);

      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken): Promise<any> {
      const client = await clientPromise;
      const db = client.db();

      const session = await db.collection("sessions").findOne({ sessionToken });

      if (!session) return null;

      const user = await db
        .collection("users")
        .findOne({ _id: session.userId });

      if (!user) return null;

      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId.toString(),
          expires: session.expires,
        },
        user: {
          ...user,
          id: user._id.toString(),
        },
      };
    },

    async updateSession(session): Promise<any> {
      const client = await clientPromise;
      const db = client.db();

      await db
        .collection("sessions")
        .updateOne({ sessionToken: session.sessionToken }, { $set: session });

      return session;
    },

    async deleteSession(sessionToken) {
      const client = await clientPromise;
      const db = client.db();

      await db.collection("sessions").deleteOne({ sessionToken });
    },

    async createVerificationToken(token) {
      const client = await clientPromise;
      const db = client.db();

      await db.collection("verificationTokens").insertOne(token);
      return token;
    },

    async useVerificationToken({ identifier, token }) {
      const client = await clientPromise;
      const db = client.db();

      const verificationToken = await db
        .collection("verificationTokens")
        .findOneAndDelete({ identifier, token });

      return verificationToken?.value;
    },
  };
}
