

import { signOut } from "../../../../auth"


export default async function BlogNavigation() {
  return (
    <div className="flex items-center justify-between px-4 py-2 ">
      <form
        className="mx-auto w-[50%] flex flex-row-reverse px-4 "
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button className="text-sm font-medium" type="submit">Sign Out</button>
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
