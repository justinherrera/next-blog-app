"use client"

import { Category } from "@/app/lib/definitions"
import { useRef } from 'react';
import { StepForward, StepBack } from 'lucide-react';

export default function CategoriesNavigation({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (scrollOffset: number) => {
    console.log(scrollRef.current)
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return(
    <div className="container p-6 relative">

      <ul className="flex space-x-4 p-4 pl-0 scroll-smooth overflow-x-hidden " ref={scrollRef}>
        <StepBack 
          size={40} 
          className="absolute -left-4 top-46 rounded-full px-2 cursor-pointer"
          onClick={() => scroll(-300)}
           />

        {categories.map(category => (
          <li
            key={category.id}
            className={`px-4 py-2 first:pl-0 cursor-pointer hover:underline`}
          >
            {category.name}
          </li>
        ))}

        <StepForward 
          size={40} 
          className="absolute -right-4 top-46  rounded-full p-2 cursor-pointer"
          onClick={() => scroll(300)}
          />
      </ul>
      

    </div>
  )
}