import { DefaultUser, DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserIF } from "./interface";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      mobile: string;
      email: string;
      image: string;
      name: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    mobile: string;
    email: string;
    image: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    mobile: string;
    email: string;
    image: string;
    name: string;
  }
}
