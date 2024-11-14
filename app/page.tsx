import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session?.user?.id);
  return <div></div>;
}
