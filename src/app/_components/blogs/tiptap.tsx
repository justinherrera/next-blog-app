'use client'

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

import BlogCreateToolbar from './blog-create-toolbar'

export default function Tiptap () {
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
        class: "w-full px-4 border border-gray-300 py-2 rounded border-t-0 rounded-t-none focus:outline-none"
      }
    },
    content: 'Content goes here...',
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="flex flex-col">
        
        <div className="mt-2 flex space-x-8 border border-gray-300 px-4 rounded rounded-b-none">
          <BlogCreateToolbar editor={editor}/>
        </div>
        

      </div>


      <EditorContent editor={editor} />
    </>

  )
}