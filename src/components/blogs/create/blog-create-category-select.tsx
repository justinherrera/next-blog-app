"use client"

import { ArrowDownUp } from "lucide-react"
import { useState } from "react"
import { Category } from "@/lib/definitions"
import { useQuery } from '@tanstack/react-query'


export default function BlogCreateCategorySelect({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <>
      <p className="font-bold mt-4">Choose a category:</p>
      <div 
        className="border p-2 px-4 rounded-lg border-gray-300 my-2 w-[50%] flex justify-between cursor-pointer shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{(!selectedCategory) ? "Travel" : selectedCategory}</p>
        <ArrowDownUp className="h-5 w-5 pt-1 text-gray-300" />
      </div>
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
    </>
  )
}