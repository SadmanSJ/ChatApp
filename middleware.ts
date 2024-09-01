import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  const authMiddleware = withAuth(
    (request) => {
      // if (request.nextUrl.pathname.startsWith("/")) {
      //   console.log(request.nextauth.token);
      //   return NextResponse.rewrite(new URL("/chat", request.url));
      // }
    },
    {
      callbacks: { authorized: ({ token }) => !!token },
      pages: {
        signIn: `/`,
      },
    }
  );

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/", "/chat", "/api/:path*"],
};
