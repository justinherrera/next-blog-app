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

import BlogCreateToolbar from '@/components/blogs/create/blog-create-toolbar'
import { FormState, Category } from '@/lib/definitions'
import Image from "next/image"
import { useState, useEffect } from 'react'

import { Upload } from "lucide-react"

import { useFormState } from "react-dom";

import { Toaster, toast } from 'sonner'
import CreateButton from '@/components/blogs/create/create-button'

const initialState: FormState = {
  message: "",
  errors: undefined,
}

type CreatePost = (state: FormState, formData: FormData) => Promise<FormState>

type DraftType = {
  title: FormDataEntryValue;
  content?: FormDataEntryValue;
};


export default function CreateForm({ categories, createPost }: { categories: Category[], createPost: CreatePost })  {
  const [image, setImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null)
  const [editorContent, setEditorContent] = useState("");

  const [state, formAction] = useFormState(createPost, initialState);
  const [hasChanges, setHasChanges] = useState(false);
  const [draft, setDraft] = useState<DraftType[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('editor') as string);
    console.log(items)
    if (items.length > 0) {
      setDraft(items);
      setEditorContent(items[0].content as string || '')
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editor', JSON.stringify(draft));
    console.log(draft)
  }, [draft]);



  // useEffect(() => {
  //   if (!hasChanges) return;
  //   function beforeUnload(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //     return ''
  //   }
  //   // alert('You have unsaved changes. Are you sure you want to leave?');
  //   window.addEventListener('beforeunload', beforeUnload, { capture: true });
  
  //   return () => {
  //     window.addEventListener('beforeunload', beforeUnload, { capture: true });
  //   };
  // }, [hasChanges]);

  console.log(selectedCategory)
  
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
      console.log(editor.getHTML())
      setEditorContent(editor.getHTML());
      setDraft(draft => [ { ...draft[0], content: editor.getHTML() } ])
    },
    content: `${editorContent}`,
  })

  useEffect(() => {
    if (editor && editorContent) {
      editor.commands.setContent(editorContent)
    }
  }, [editor, editorContent])

  if (!editor) {
    return null
  }



  if (state?.message === "Server Error") {
    toast.error("Failed to create post")
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Toaster position="top-right" richColors  />
      <form action={formAction} className="w-[25rem] sm:w-full md:w-[44rem] lg:w-[52rem]" onChange={ (e) =>{
        const data = new FormData(e.currentTarget as HTMLFormElement)
        const values = Array.from(data.values())
        console.log(values[2])
        console.log(selectedCategory)
        setDraft([
          {
            title: values[0],
            content: values[1],
            // category: selectedCategory,
          }
        ])
        const changedFields = values.filter(value => (value as string).length || (value as File).size)
        setHasChanges(Boolean(changedFields.length))
      } }>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 px-2 font-bold text-4xl focus:outline-none"
            placeholder="Your title goes here..."
            defaultValue={draft[0]?.title as string || ''}
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
          <input type="hidden" name="content" value={editorContent} defaultValue={draft[0]?.content as string || ''} />
          <EditorContent editor={editor} name="content" />
          <span className="text-sm text-red-500">{state?.errors?.content}</span>
        </div>

        <div>
          <select name="category" className="hidden">
            <option value={selectedCategory?.id || ""}>{selectedCategory?.name}</option>
          </select>

          <p className="font-bold mt-4">Choose a category:</p>
            <div 
              className="border p-2 px-4 rounded-lg border-gray-300 my-2 w-full sm:w-[50%] flex justify-between cursor-pointer shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p>
                {
                  /* select the draft category if it exists, otherwise use the selected category */ 
                  // draft[0]?.category ? draft[0].category?.name :
                  (!selectedCategory?.name) 
                    ? "-- Please choose a category --" 
                    : selectedCategory?.name
                }
              </p>
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

        <div className="flex w-full space-x-8 justify-center md:justify-normal">
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
          <div>
            {
              previewImage ? <Image src={previewImage} alt="" height={0} width={150} className="w-auto h-[7rem] mt-4 object-cover" /> : ""
            }
          </div>
        </div>

        <CreateButton state={state} />
        {/* <DraftButton /> */}
        <button 
          type="submit" 
          className={`mt-4 py-1 px-4 rounded-2xl`}
        >Save Draft</button>
      </form>
      
    </div>
  )
}