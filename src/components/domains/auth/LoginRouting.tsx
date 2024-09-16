import { auth } from "@/lib/auth";

export default async function loginRouter(router: any) {
    const a = await auth();
    if (a?.user.role === "ADMIN") {
        return router.push("/admin/");
    } else if (a?.user.role === "SUPERVISOR") {
        return router.push("/supervisor/");
    } else if (a?.user.role === "USER") {
        return router.push("/user/");
    }
}