import { LoginForm } from "./_widgets/login-form";
import { SwitchLanguage } from "../_widgets/switch-language";

export default async function LoginPage() {
  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <LoginForm />
      <SwitchLanguage />
    </main>
  );
}
