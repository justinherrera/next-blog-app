import { Suspense } from "react"
import CreateForm from "@/components/blogs/create/create-form"
import { createPost } from "@/lib/actions"
import { auth } from "../../../../auth"
import NotAuthorized from "@/components/auth/not-authorized"

export default async function Create() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
  const { categories } = await response.json()
  const session = await auth()
  if (!session) return <NotAuthorized />

  return (
  <div className="mt-24 w-screen  flex items-center justify-center">
    <div className="w-full px-12">
      <Suspense fallback={<p className="text-2xl">Loading...</p>}>
        <CreateForm categories={categories} createPost={createPost} />
      </Suspense>
    </div>



    


  </div>)
}