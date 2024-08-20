import { authOption } from "@/lib/authOptions";
import { apiBackend, nextAuthSecret } from "@/lib/secrets";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
