import { Suspense } from "react"
import { editPost } from "@/lib/actions"
import EditForm from '@/components/blogs/edit/edit-form'
import NotFound from "@/app/not-found"
import { auth } from "../../../../../../auth"

export default async function Page({ params }: { params: { slug: string } }) {

  const session = await auth()
  const user = session?.user

  const categoriesData = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await categoriesData.json()

  const slugData = await fetch(`${process.env.BASE_URL}/api/blogs?slug=${params.slug}`)
  const data = await slugData.json()

  console.log(data.post.user.id === user?.id)

  if (Object.keys(data.post).length === 0 || !(data.post.user.id === user?.id)) { // test this
    return <NotFound />
  }

  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      <Suspense fallback={<p className="font-bold text-2xl">Loading...</p>}>
        <EditForm categories={categories} editPost={editPost} post={data.post} />
      </Suspense>
    </div>

  </div>)
}