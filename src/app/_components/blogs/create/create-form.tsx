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

import BlogCreateToolbar from '../create/blog-create-toolbar'
import BlogCategoriesList from './blog-categories-list'
import { Category } from '@/app/lib/definitions'
import BlogCreateCategorySelect from './blog-create-category-select'
import { useState } from 'react'

import { Upload } from "lucide-react"

import { useFormState } from "react-dom";

type Fields = {
  title: string;
  content: string;
  category: string;
  image: string;
}
 
type FormState = {
  message: string;
  errors: Record<keyof Fields, string[]> | undefined;
  fieldValues?: Fields
}

const initialState: FormState = {
  message: "",
  errors: undefined,
  fieldValues: {
    title: "",
    content: "",
    category: "",
    image: "",
  }
}

export default function CreateForm({ createPost, categories }: { createPost: FormData, categories: Category[] })  {
  const [image, setImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState("");

  const [state, formAction] = useFormState<FormState, FormState>(createPost, initialState);
  
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
        class: " px-4 border border-gray-300 py-2 rounded border-t-0 rounded-t-none focus:outline-none h-56 shadow-lg bg-white text-pretty overflow-y-auto"
      }
    },
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
    content: 'Content goes here...',
  })

  if (!editor) {
    return null
  }

  console.log(state)
  return (
    <div className="flex flex-col items-center">
      <form action={formAction} className="w-[51rem]">
        <div className="mt-2">

          <input
            type="text"
            name="title"
            id="title"
            className="block w-full py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 px-2 font-bold text-4xl focus:outline-none"
            placeholder="Your title goes here..."
            autoFocus
          />
          <span className="text-sm text-red-500">{state?.errors?.title}</span>
        </div>

        <div className="">
          <div className="flex flex-col ">
            <div className="mt-2 flex space-x-8 border border-gray-300 px-4 rounded rounded-b-none">
              <BlogCreateToolbar editor={editor}/>
            </div>
          </div>
          <input type="hidden" name="content" value={editorContent} />
          <EditorContent editor={editor} name="content" />
          <span className="text-sm text-red-500">{state?.errors?.content}</span>
        </div>

        <div>
          {
            selectedCategory ? (
              <select name="category" className="hidden">
                <option value={selectedCategory}>{selectedCategory}</option>
              </select>
            ) : ""
          }

          <p className="font-bold mt-4">Choose a category:</p>
            <div 
              className="border p-2 px-4 rounded-lg border-gray-300 my-2 w-[50%] flex justify-between cursor-pointer shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p>{(!selectedCategory) ? "Travel" : selectedCategory}</p>
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
                        className={`w-full border-gray-300 cursor-pointer ${(selectedCategory === category.name) ? "bg-black text-white" : "hover:bg-gray-300"} `}
                        onClick={() => {
                          setIsOpen(false)
                          setSelectedCategory(category.name)
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

        <div className="flex flex-col w-full mt-4 bg-grey-lighter">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-gray-400">
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
                  }
                  
                }} />
              
          </label>
          <span className="text-sm text-red-500 mt-2">{state?.errors?.image}</span>
        </div>

        <button type="submit" className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button>
      </form>
      
    </div>
  )
}