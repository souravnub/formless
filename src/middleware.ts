import { auth } from "@/lib/auth";

export default auth((req) => {
    // if is not loggedIn and is also not at /login or /signup, then push to login
    if (!req.auth && (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/signup")) {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    // if is loggedIn and going to /login or /signup, then push back to the origin
    if (req.auth && (req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/signup")) {
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

        // trying to access homepage then redirect to respective dashboard
        if (req.nextUrl.pathname === "/") {
            const dashboardRoute = new URL(
                `/${userRole.toLowerCase()}`,
                req.nextUrl.origin
            );
            return Response.redirect(dashboardRoute);
        }

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
