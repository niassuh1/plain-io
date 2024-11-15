import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignoutButton() {
  async function signOutAction() {
    "use server";
    await signOut();
  }
  return (
    <form action={signOutAction}>
      <Button variant="ghost" className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        Sign out
      </Button>
    </form>
  );
}
