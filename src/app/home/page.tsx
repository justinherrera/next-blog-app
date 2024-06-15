import SignOut from "../../app/_components/sign-out"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  console.log(session)
  if (!session?.user) {
    redirect("/")
  }

  return (
    <div>
      Authorized Home
      <SignOut />
    </div>
  );
}