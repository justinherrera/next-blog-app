"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Italic as TiptapItalic } from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import { Code as TiptapCode } from '@tiptap/extension-code'
import Blockquote from '@tiptap/extension-blockquote'
import { Underline as TiptapUnderline } from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import { ArrowDownUp } from "lucide-react"
import Image from "next/image"

import BlogCreateToolbar from '../create/blog-create-toolbar'
import { FormState, Category, Post } from '@/app/lib/definitions'
import { useState } from 'react'
import { usePathname } from "next/navigation"

import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { Upload } from "lucide-react"

import { useFormState } from "react-dom";

import { Toaster, toast } from 'sonner'
import EditButton from './edit-button'
import NotFound from '@/app/not-found'

const initialState: FormState = {
  message: "",
  errors: undefined,
}

type EditPost = (state: FormState, formData: FormData) => Promise<FormState>

export default function EditForm({ categories, editPost, post }: { categories: Category[], editPost: EditPost, post: Post })  {



  const [image, setImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  }>(post.category)
  const [editorContent, setEditorContent] = useState(post.content);

  const [state, formAction] = useFormState(editPost, initialState);

  console.log(state)
  
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
        class: " px-4 border border-gray-300 py-2 rounded border-t-0 rounded-t-none focus:outline-none h-56 shadow-lg bg-white text-pretty overflow-y-auto mb-2 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc "
      }
    },
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
    content: post.content
  })

  if (!editor) {
    return null
  }

  if (state?.message === "Server Error") {
    toast.error("Failed to create post")
  }

  if (state.message === 'validation-error') {
    toast.error("Oops... something went wrong")
  }

  

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-right" richColors  />
      <form action={formAction} className="w-[25rem] sm:w-[51rem] md:w-[44rem] lg:w-[52rem]">
        <input type="text" name="id" defaultValue={post.id} hidden />
        <div className="mt-2">

          <input
            type="text"
            name="title"
            id="title"
            className="block w-full py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 px-2 font-bold text-4xl focus:outline-none"
            placeholder="Your title goes here..."
            defaultValue={post.title}
            autoFocus
          />
          <span className="text-sm text-red-500">{state?.errors?.title}</span>
        </div>

        <div className="">
          <div className="flex flex-col ">
            <div className="mt-2 flex md:justify-between lg:justify-start lg:space-x-8 border border-gray-300 px-4 rounded rounded-b-none flex-wrap xl:flex-nowrap">
              <BlogCreateToolbar editor={editor}/>
            </div>
          </div>
          <input type="hidden" name="content" value={editorContent} />
          <EditorContent editor={editor} name="content" />
          <span className="text-sm text-red-500">{state?.errors?.content}</span>
        </div>

        <div>
          <select name="category" className="hidden" defaultValue={post.category.name}>
            <option value={selectedCategory?.id || ""}>{selectedCategory?.name}</option>
          </select>

          <p className="font-bold mt-4">Choose a category:</p>
            <div 
              className="border p-2 px-4 rounded-lg border-gray-300 my-2 w-full sm:w-[50%] flex justify-between cursor-pointer shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p>{(!selectedCategory?.name) ? post.category.name : selectedCategory?.name}</p>
              <ArrowDownUp className="h-5 w-5 pt-1 text-gray-300" />
            </div>
            <span className="text-sm text-red-500">{state?.errors?.category}</span>
            {
              isOpen ? (
                <div className="border border-gray-300 my-2 w-[50%] flex-col">
                  {
                    categories.map((category: Category) => (
                      <div 
                        key={category.id} 
                        className={`w-full border-gray-300 cursor-pointer ${(selectedCategory?.name === category.name) ? "bg-black text-white" : "hover:bg-gray-300"} `}
                        onClick={() => {
                          setIsOpen(false)
                          setSelectedCategory({
                            id: category.id,
                            name: category.name
                          })
                        }}
                      >
                        <p className="p-2 ">{category.name}</p>
                      </div>
                    ))
                  }
                </div>
              ) : ""
            }
          </div>

        <div className="flex w-full space-x-8 justify-center xl:justify-normal">
          <div className="flex flex-col mt-4 bg-grey-lighter">
            <label className="sm:w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-gray-400 w-full">
                <Upload />
                <span className="mt-2 text-base leading-normal">{(!image) ? "Add cover image" : image}</span>
                <input 
                  type='file' 
                  className="hidden" 
                  accept="image/*"         
                  name="image"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImage(e.target.files[0].name)
                      setPreviewImage(URL.createObjectURL(e?.target?.files?.[0]))
                    }
                    
                  }} />
                
            </label>
            <span className="text-sm text-red-500 mt-2">{state?.errors?.image}</span>
          </div>
          <input type="hidden" name="currentImage" defaultValue={post.imageUrl} />
          <div>
            <Image src={!previewImage ? post.imageUrl : previewImage} alt="" height={0} width={150} className="w-auto h-[7rem] mt-4 object-cover" />
          </div>

        </div>


        <EditButton state={state} />
      </form>
      
    </div>
  )
}