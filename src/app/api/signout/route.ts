
import { signOut } from "../../../../auth";
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  await signOut({ redirect: false, redirectTo: "/login" });
  return Response.json({ message: "Signed out" });

 

}