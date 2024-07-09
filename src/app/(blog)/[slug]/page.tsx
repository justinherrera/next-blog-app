
import { User } from "@/app/lib/definitions"
import { auth } from "../../../../auth"
import SlugPage from "@/app/_components/blogs/slug/slug-page"

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