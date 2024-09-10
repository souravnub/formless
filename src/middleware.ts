import { auth } from "@/lib/auth";

export default auth((req) => {
    // if is not loggedIn and is also not at /login, then push to login
    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    // if is loggedIn and going to /login, then push back to the origin
    if (req.auth && req.nextUrl.pathname == "/login") {
        return Response.redirect(req.nextUrl.origin);
    }

    if (req.auth) {
        const pathElements = req.nextUrl.pathname.split("/");
        const userRole = req.auth.user.role;

        const notFoundRoute = new URL("/not-found", req.nextUrl.origin);
        const isProtectedRoute =
            pathElements.includes("admin") ||
            pathElements.includes("supervisor") ||
            pathElements.includes("user");

        // trying to access a protected route && accessing a page which shouldn't be accessed by the current role :: redirect to a not found page
        if (
            isProtectedRoute &&
            !pathElements.includes(userRole.toLowerCase())
        ) {
            return Response.redirect(notFoundRoute);
        }
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
