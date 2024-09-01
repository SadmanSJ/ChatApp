import {
  apiBackend,
  googleClientId,
  googleClientSecret,
  nextAuthSecret,
} from "@/lib/secrets";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

let user: any;

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

          // console.log("l-d-", data);

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
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   // console.log("user", user);
    //   // console.log("account", account);
    //   // console.log("profile", user);

    //   const { data } = await axios.post(apiBackend + "/user/googleLogin", {
    //     email: user.email,
    //     name: user.name,
    //     image: user.image,
    //   });
    //   user = data.user;
    //   // console.log("lgdata", data);

    //   return true;
    // },
    async session({ session, token }) {
      // console.log("s", session);
      if (token.id) {
        const { data } = await axios.post(apiBackend + "/user/googleLogin", {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });

        // console.log(data);

        session.user._id = data.user._id;
      } else {
        session.user = token;
      }

      return session;
    },
    async jwt({ token, user, session, trigger }) {
      // if (trigger === "update") return { ...token, ...session?.user };
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
