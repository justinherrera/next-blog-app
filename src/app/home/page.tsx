import SignOut from "../../app/_components/sign-out"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
  // if (!session?.user) {
  //   redirect("/")
  // }

  return (
    <div>
      Welcome back, {session?.user?.name}
      <SignOut />
    </div>
  );
}