import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
    const a = await auth();

    return (
        <main>
            userRole: {a?.user.role} <Button>Wallahi</Button>
        </main>
    );
}
