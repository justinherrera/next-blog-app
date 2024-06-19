'use client'

import Tiptap from "../../_components/blogs/tiptap"

export default function Create() {
  return (
  <div className="mt-24">
    <div className="mt-2">
      <input
        type="text"
        name="title"
        id="title"
        className="block w-full py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 px-2 font-bold text-4xl focus:outline-none"
        placeholder="Your title goes here..."
        autoFocus
      />
    </div>
    <Tiptap />
    <button className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button>
  </div>)
}