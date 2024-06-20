import { ArrowDownUp } from "lucide-react"
import { useState } from "react"
import { Category } from "@/app/lib/definitions"

const categories: Category[] = [
  { id: 1, name: 'Travel' },
  { id: 2, name: 'Technology' },
  { id: 3, name: 'Food' },
  { id: 4, name: 'Health' },
  { id: 5, name: 'Fitness' },
  { id: 6, name: 'Fashion' },
  { id: 7, name: 'Music' },
  { id: 8, name: 'Art' },
  { id: 9, name: 'Literature' },
  { id: 10, name: 'Sports' },
  { id: 11, name: 'Cooking' },
  { id: 12, name: 'Photography' },
  { id: 13, name: 'Politics' },
  { id: 14, name: 'Business' },
  { id: 15, name: 'Science' },
  { id: 16, name: 'Education' },
  { id: 17, name: 'Entertainment' },
];


export default function BlogCreateCategorySelect() {
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
              categories.map((category) => (
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
            {/* <div className="w-full border-gray-300 cursor-pointer hover:bg-gray-300">
              <p className="p-2 ">Travel</p>
            </div>
            <div className="w-full border-gray-300 cursor-pointer hover:bg-gray-300 ">
              <p className="p-2 ">Entertainment</p>
            </div>
            <div className="w-full border-gray-300 bg-black text-white">
              <p className="p-2 ">Food</p>
            </div> */}
          </div>
        ) : ""
      }
    </>
  )
}