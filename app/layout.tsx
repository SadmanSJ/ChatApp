import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/UI/Navbar";
import dynamic from "next/dynamic";
import { inter, roboto } from "./fonts";
import { getServerSession } from "next-auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextAuthSessionProvider from "./NextAuthSessionProvider";
import Sidebar from "@/components/UI/Sidebar";
import { ApolloWrapper } from "@/lib/ApolloProvider";
import MainView from "@/components/UI/MainView";
import { authOption } from "@/lib/authOptions";

const ThemeProvider = dynamic(() => import("@/app/ThemeProvider"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "ChatApp",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} body font-roboto`}>
        <NextAuthSessionProvider>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            enableColorScheme
          >
            <ApolloWrapper>
              {session ? (
                <MainView session={session}>{children}</MainView>
              ) : (
                <main className="p-4 w-full">{children}</main>
              )}
              <ToastContainer />
            </ApolloWrapper>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
