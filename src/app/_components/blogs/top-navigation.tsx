

import SignOut from "../../_components/sign-out"
import { auth } from "../../../../auth"


export default async function BlogNavigation() {
  const session = await auth()
  console.log(session)
  if (!session) return <div>Not authenticated</div>
  return (
    <div className="bg-red-400">
      <button>Sign Out</button>
    </div>
  )
}
