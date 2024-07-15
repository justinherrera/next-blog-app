
import { User } from "@/lib/definitions"
import { auth } from "../../../../auth"
import SlugPage from "@/components/blogs/slug/slug-page"

export default async function Page(
  {
    params
  }:
  {
    params: {
      slug: string
    }
  }
) {

  const session = await auth()
  const user = session?.user


  return (
    <SlugPage slug={params.slug} user={user as User} />

    
  )
}