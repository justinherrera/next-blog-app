"use client"

import Image from "next/image"
import { format } from "date-fns"
import Heart from "@/app/_components/blogs/icons/Heart"
import { Post } from "@/app/lib/definitions"
import { useState } from "react"
import parse from 'html-react-parser';
import { EllipsisVertical, FilePenLine, Trash } from "lucide-react"
import EditModal from "./edit-modal"
import DeleteDialog from "./delete-dialog"

export default function BlogPost({ post, isDeleting, setIsDeleting }: { post: Post, isDeleting: boolean, setIsDeleting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  

  return (
    <div className="bg-white px-6 py-16 lg:py-32 lg:px-8">
      <div className="mx-auto md:w-full lg:max-w-3xl text-base leading-7 text-gray-700 text-wrap break-words">
        <div className="w-full flex justify-between relative">
          {/* {
            isDeleting ? <DeleteDialog postId={post.id} setIsDeleting={setIsDeleting} /> : ""
          } */}
          
          <p className="text-base font-semibold leading-7 text-indigo-600">Introducing ✨</p>
          <EllipsisVertical className="w-5 h=5 text-black cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
            {
              isEditing && !isDeleting ? <EditModal postId={post.id} setIsDeleting={setIsDeleting}  /> : ""
            }
          
        </div>
        
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <div className="flex items-center gap-x-6 my-8 border-b pb-4 border-gray-200">
          <div className="flex min-w-0 gap-x-4">
            <Image 
              className="h-12 w-12 flex-none rounded-full bg-gray-50" 
              height={100}
              width={100}
              src={post.user.image} alt="" />
            <div className="min-w-0 flex-auto">
              <div className="flex space-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">{post.user.name}</p>
              </div>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy")}</p>
            </div>
          </div>
        </div>
        <figure className="mt-16">
          <Image
            height={1000}
            width={1000}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
            src={post.imageUrl}
            alt=""
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            Faucibus commodo massa rhoncus, volutpat.
          </figcaption>
        </figure>
        <div className="mt-8 sm:mt-16 max-w-2xl">
          {/* <p>{post.content}</p> */}
          {parse(post.content)}

        </div>
        
        <div className="mt-8">
          <button 
            className={`flex space-x-1 border-2 ${isLiked ? "bg-[#FBD1DA] border-[#F8C8CF]" : "border-black"}  shadow-lg  p-1 px-4  rounded-lg items-center justify-center w-24`}
            onClick={() => setIsLiked(!isLiked)}
            >
            <Heart color="#E42D54" isLiked={isLiked} />
            {/* <Heart className="h-4 w-4" color={`${isLiked ? "#E42D54" : "#000000"}`} /> */}
            <span className="font-bold text-black text-sm">{isLiked ? "Liked" : "Like"}</span>
          </button>
        </div>

      </div>
    </div>
  )
}