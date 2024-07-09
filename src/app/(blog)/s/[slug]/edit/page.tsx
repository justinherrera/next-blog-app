import { Suspense } from "react"
import { createPost } from "@/app/lib/actions"
import EditForm from '@/app/_components/blogs/edit/edit-form'
import { Category, FormState } from '@/app/lib/definitions'


type CreatePost = (state: FormState, formData: FormData) => Promise<FormState>

export default async function Page({ params }: { params: { slug: string } }) {

  const categoriesData = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await categoriesData.json()

  const slugData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?slug=${params.slug}`)
  const data = await slugData.json()

  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      test
      <Suspense fallback={<p className="font-bold text-2xl">Loading...</p>}>
        <EditForm categories={categories} createPost={createPost} post={data.post} />
      </Suspense>
    </div>



    


  </div>)
}