import { DefaultUser, DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserIF } from "./interface";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      _id: string;
      role: string;
      mobile: string;
      email: string;
      image: string;
      name: string;
    };
  }

  interface User extends DefaultUser {
    _id: string;
    role: string;
    mobile: string;
    email: string;
    image: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    role: string;
    mobile: string;
    email: string;
    image: string;
    name: string;
  }
}
