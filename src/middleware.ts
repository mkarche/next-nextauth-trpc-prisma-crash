import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

//export { default } from "next-auth/middleware";

export default withAuth({
	callbacks: {
		authorized: ({ token }) => {
			//console.log("WithAuth Parameters:", token);
			return !!token;
		},
	},
});

export const config = {
	matcher: ["/dashboard/:path*", "/"],
};

// export function middleware(request: NextRequest) {
// 	if (request.nextUrl.pathname.startsWith("/auth/signin")) {
// 	}
// 	if (request.nextUrl.pathname.startsWith("/about")) {
// 		// This logic is only applied to /about
// 	}
// 	if (request.nextUrl.pathname.startsWith("/dashboard")) {
// 		// This logic is only applied to /dashboard
// 	}
// }
