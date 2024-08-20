import { apiBackend, nextAuthSecret } from "@/lib/secrets";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: {
          label: "mobile",
          type: "text",
          placeholder: "01xxxxxxxxx",
        },
        otp: { label: "otp", type: "text", placeholder: "x x x x x x" },
      },
      async authorize(credentials) {
        try {
          const { mobile, otp } = credentials as {
            mobile: string;
            otp: string;
          };

          const { data } = await axios.post(`${apiBackend}/user/login`, {
            mobile,
            // otp,
          });

          console.log("l-d-", data);

          const user = data.user;

          if (data.status === "success" && Object.keys(user).length > 0) {
            // console.log("user=>", user);
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          console.log(error.response.data);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") return { ...token, ...session?.user };
      return { ...token, ...user };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: nextAuthSecret,
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
