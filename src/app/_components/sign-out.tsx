import { signOut } from "../../../auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/login", redirect: true })
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}