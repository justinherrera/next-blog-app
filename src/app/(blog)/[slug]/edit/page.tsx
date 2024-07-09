import { Suspense } from "react"
import EditForm from "@/app/_components/blogs/edit/edit-form"
import { createPost } from "@/app/lib/actions"


export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await response.json()

  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      <Suspense fallback={<p className="font-bold text-2xl">Loading...</p>}>
        <EditForm categories={categories} createPost={createPost} />
      </Suspense>
    </div>



    


  </div>)
}