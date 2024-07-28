"use client"

import Image from "next/image"
import { format } from "date-fns"
import Heart from "@/components/blogs/icons/Heart"
import { Post, User } from "@/lib/definitions"
import { useMemo, useState } from "react"
import parse from 'html-react-parser';
import { EllipsisVertical, FilePenLine, Trash } from "lucide-react"
import EditModal from "@/components/blogs/slug/edit-modal"
import { generateJSON } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Italic as TiptapItalic } from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import { Code as TiptapCode } from '@tiptap/extension-code'
import Blockquote from '@tiptap/extension-blockquote'
import { Underline as TiptapUnderline } from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"


export default function BlogPost({ post, isDeleting, setIsDeleting, user }: { post: Post, isDeleting: boolean, setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>, user: User }) {
  
  const [isLiked, setIsLiked] = useState<boolean>(post.likes?.find(like => like.userId === post.loggedUser?.id) ? true : false)
  const [isEditing, setIsEditing] = useState(false)
  const [totalLikes, setTotalLikes] = useState(post.likes?.length || 0)

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    if (isLiked) {
      setTotalLikes((prevTotalLikes) => prevTotalLikes - 1)
    } else {
      setTotalLikes((prevTotalLikes) => prevTotalLikes + 1)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likes?postId=${post.id}`, { method: "POST" })
    console.log(response)
    
    if (!response.ok) {
      setIsLiked(!isLiked)
      setTotalLikes((prevTotalLikes) => prevTotalLikes - 1)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TiptapCode,
      Highlight.configure({ multicolor: true }),
      TiptapItalic,
      Strike,
      TiptapUnderline,
      Blockquote,
      BulletList, 
      ListItem,
      CodeBlock,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    editorProps: {
      attributes: {
        class: " px-4 py-2  focus:outline-none text-pretty h-auto mb-2 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc "
      }
    },
    content: post.content,
  })

  editor?.setEditable(false)
  if (!editor) {
    return null
  }

  return (
    <div className="bg-white px-6 py-16 lg:py-32 lg:px-8">
      <div className="mx-auto md:w-full lg:max-w-3xl text-base leading-7 text-gray-700 text-wrap break-words">
        <div className="w-full flex justify-between relative">
          {/* {
            isDeleting ? <DeleteDialog postId={post.id} setIsDeleting={setIsDeleting} /> : ""
          } */}
          
          <p className="text-base font-semibold leading-7 text-indigo-600">Introducing ✨</p>
          {
            user?.id === post.userId ? <EllipsisVertical className="w-5 h=5 text-black cursor-pointer" onClick={() => setIsEditing(!isEditing)} /> : ""
          }
          {/* <EllipsisVertical className="w-5 h=5 text-black cursor-pointer" onClick={() => setIsEditing(!isEditing)} /> */}
            {
              isEditing && !isDeleting ? <EditModal postId={post.id} setIsDeleting={setIsDeleting} slug={post.slug}  /> : ""
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
            {post.category.name}
            
          </figcaption>
        </figure>
        <div className="mt-8 sm:mt-16 max-w-2xl">
          {
            <EditorContent editor={editor} name="content" />
          }

        </div>
        
        <div className="mt-8">
          <button 
            className={`flex space-x-1 border-2 ${isLiked ? "bg-[#FBD1DA] border-[#F8C8CF]" : "border-black"}  shadow-lg  p-1 px-4  rounded-lg items-center justify-center w-auto`}
            onClick={handleLike}
            >
            <Heart color="#E42D54" isLiked={isLiked} />
            {/* <Heart className="h-4 w-4" color={`${isLiked ? "#E42D54" : "#000000"}`} /> */}
            <span className="font-bold text-black text-sm">{isLiked ? `${totalLikes <= 0 ? "Liked" : `Liked (${totalLikes})`}` : `${totalLikes <= 0 ? "Like" : `Like (${totalLikes})`}`}</span>
          </button>
        </div>

      </div>
    </div>
  )
}