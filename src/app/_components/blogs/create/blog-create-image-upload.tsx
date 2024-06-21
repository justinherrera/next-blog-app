"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

export default function BlogCreateImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  return (
    <div className="flex w-full mt-4 items-center bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-gray-400">
            <Upload />
            <span className="mt-2 text-base leading-normal">{(!image) ? "Add cover image" : image}</span>
            <input 
              type='file' 
              className="hidden" 
              accept="image/*"         
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0].name)
                }
                
              }} />
        </label>
    </div>
  ) 
}