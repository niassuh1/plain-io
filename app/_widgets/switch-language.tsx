import { Button } from "@/components/ui/button";
import { LocalizationMessages } from "@/types/localization";
import { Languages } from "lucide-react";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export async function SwitchLanguage() {
  const messages = (await getMessages()) as LocalizationMessages;
  async function switchLanguage() {
    "use server";
    const cookie = await cookies();
    const locale = cookie.get("locale")?.value ?? "en";
    if (locale === "en") {
      cookie.set("locale", "ar");
    } else {
      cookie.set("locale", "en");
    }
  }
  return (
    <form action={switchLanguage}>
      <Button className="flex items-center gap-2" variant="secondary">
        <Languages className="w-4 h-4" />
        {messages["LoginPage"]["switchLanguageButton"]}
      </Button>
    </form>
  );
}
