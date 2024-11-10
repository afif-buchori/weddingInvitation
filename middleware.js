import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  const verifyResponse = await fetch(
    new URL("/api/verify-token", request.url),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: authToken }),
    }
  );

  const url = request.nextUrl;

  if (verifyResponse.status === 200 && url.pathname === "/login") {
    // Redirect ke dashboard jika user sudah login dan mencoba akses /login
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (verifyResponse.status !== 200 && url.pathname.startsWith("/dashboard")) {
    // Redirect ke login jika user belum login dan mencoba akses /dashboard
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Reset cookies token
    response.cookies.set("authToken", "", { path: "/", maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const authToken = request.cookies.get("authToken")?.value;

//   const url = request.nextUrl;

//   if (authToken && url.pathname === "/login") {
//     // Redirect ke dashboard jika user sudah login dan mencoba akses /login
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!authToken && url.pathname.startsWith("/dashboard")) {
//     // Redirect ke login jika user belum login dan mencoba akses /dashboard
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login"],
// };
