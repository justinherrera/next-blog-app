
import { signOut } from "../../../../auth";
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  // await signOut({ redirectTo: "/login", redirect: true });
  await signOut();
  Response.json({ message: "Signed out" });

 

}