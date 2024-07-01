
import { Bold, Underline, Code, Highlighter, Italic, Strikethrough, Quote, List, Braces, Heading1, Heading2, Heading3, Settings } from 'lucide-react'
import { type Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export default function BlogCreateToolbar({ editor }: Props) {

  if (!editor) {
    return null;
  }
  
  return (
    <>
      {/* <button 
        className="bg-gray-300 p-2 rounded block sm:hidden"
      >
        <Settings className="w-5 h-5" />
      </button>
      <div>

      </div> */}
      
      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? "bg-gray-300 p-2 rounded isActive" : "p-2 mr-2 sm:mr-0"}
      >
        <Heading1 className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? "bg-gray-300 p-2 rounded isActive" : "p-2 mr-2 sm:mr-0"}
      >
        <Heading2 className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? "bg-gray-300 p-2 rounded isActive" : "p-2 mr-2 sm:mr-0"}
      >
        <Heading3 className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Bold className="w-5 h-5" />
      </button>
      
      <button 
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Underline className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"} 
      >
        <Code className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Highlighter className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Italic className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Strikethrough className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Quote className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <List className="w-5 h-5" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? "bg-gray-300 p-2 rounded" : "p-2 mr-2 sm:mr-0"}
      >
        <Braces className="w-5 h-5" />
      </button>
    </>
  )
}