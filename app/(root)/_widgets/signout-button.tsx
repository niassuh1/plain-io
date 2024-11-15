import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LocalizationMessages } from "@/types/localization";
import { LogOut } from "lucide-react";
import { getMessages } from "next-intl/server";

export async function SignoutButton() {
  async function signOutAction() {
    "use server";
    await signOut();
  }

  const messages = (await getMessages()) as LocalizationMessages;

  return (
    <form action={signOutAction}>
      <Button variant="ghost" className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        {messages["HomePage"]["signOutButton"]}
      </Button>
    </form>
  );
}
