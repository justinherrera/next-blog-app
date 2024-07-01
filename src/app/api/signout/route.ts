
import { signOut } from "../../../../auth";
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  // await signOut({ redirectTo: "/login", redirect: true });
  console.log("called")
  await signOut({ redirect: false, redirectTo: "/login" });
  return Response.json({ message: "Signed out" });

 

}