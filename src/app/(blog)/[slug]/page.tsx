

import prisma from "@/app/utils/prisma-connect"
import SlugPost from "@/app/_components/blogs/slug/slug-post"
import { Suspense, useEffect, useState } from "react"
import LoadingSlug from "@/app/_components/blogs/skeletons/loading-slug"
import NotFound from "@/app/not-found"
import DeleteDialog from "@/app/_components/blogs/slug/delete-dialog"
import { Post, User } from "@/app/lib/definitions"
import { auth } from "../../../../auth"
import { useSession } from "next-auth/react"
import { BaseNextResponse } from "next/dist/server/base-http"
import { Toaster } from "sonner"
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
    // <div className="">
    //   <Toaster position="top-right" richColors  />
    //   <div className={`${isDeleting ? "brightness-50" : ""}`}>
    //     <Suspense fallback={<LoadingSlug />}>
    //       <SlugPost post={post} setIsDeleting={setIsDeleting} isDeleting={isDeleting} />
    //     </Suspense>
    //   </div>


    //   {
    //     isDeleting ? <DeleteDialog postId={post.id} setIsDeleting={setIsDeleting} /> : ""
    //   }
    // </div>
    <SlugPage slug={params.slug} user={user as User} />

    
  )
}