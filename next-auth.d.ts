import { DefaultUser, DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserIF } from "./interface";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      _id: string;
      role: string;
      mobile: string;
    };
  }
  interface User extends DefaultUser {
    _id: string;
    role: string;
    mobile: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    role: string;
    mobile: string;
  }
}
