import { TodoBoard } from "./_widgets/todo-board";

import { SignoutButton } from "./_widgets/signout-button";
import { auth } from "@/auth";

export default async function Home() {
  const date = new Date();
  // Better to pass the userid from the server
  const session = await auth();

  return (
    <main className="min-h-screen flex justify-center py-24 px-4">
      <div className="w-full max-w-screen-md space-y-4">
        <div className="flex items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Good evening! 😎</h1>
            <p className="text-muted-foreground">Its {date.toDateString()}</p>
          </div>
          <SignoutButton />
        </div>
        {session?.user.id && <TodoBoard userId={session?.user.id} />}
      </div>
    </main>
  );
}
