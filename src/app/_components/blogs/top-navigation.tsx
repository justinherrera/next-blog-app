

import { signOut } from "../../../../auth"


export default async function BlogNavigation() {
  return (
    <div className="bg-red-400 flex items-center justify-between px-4 py-2">
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button className="text-sm font-medium text-white" type="submit">Sign Out</button>
      </form>
{/*       
      <button 
        onClick={async () => {
          "use server"
          await signOut()
        }}
      className="text-sm font-medium text-white">Sign Out</button> */}
    </div>
  )
}
