import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";
import TTS from "@/components/TTS";

export default async function Home() {
  const a = await auth();

  return (
    <main>
      userRole: {a?.user.role} <LogoutButton />
    </main>
  );
}
