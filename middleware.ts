import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { RoleEnum } from "./interface/enum";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = withAuth(
    (request) => {
      // if (
      //   request.nextUrl.pathname.startsWith("/") &&
      //   request.nextauth.token?.role === RoleEnum.Customer
      // ) {
      //   console.log(request.nextauth.token?.role);
      //   return NextResponse.rewrite(new URL("/customer", request.url));
      // }
      // if (
      //   request.nextUrl.pathname.startsWith("/") &&
      //   request.nextauth.token?.role !== RoleEnum.Customer
      // ) {
      //   console.log("A", request.nextauth.token?.role);
      //   return NextResponse.rewrite(new URL("/admin", request.url));
      // }
    },
    {
      callbacks: { authorized: ({ token }) => !!token },
      pages: {
        signIn: `/login`,
      },
    }
  );

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/", "/customer", "/login", "/user/:path*", "/api/:path*"],
};
