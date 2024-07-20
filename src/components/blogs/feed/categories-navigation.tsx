"use client"

import { Category } from "@/lib/definitions"
import { useRef, useState } from 'react';
import { StepForward, StepBack, CircleArrowRight, CircleArrowLeft } from 'lucide-react';
import Link from "next/link";


export default function CategoriesNavigation({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isScrolling, setIsScrolling] = useState(false)
  const [isStartReached, setIsStartReached] = useState(true)
  const [isEndReached, setIsEndReached] = useState(false)

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return(
    <div className="container py-2 sm:p-6 relative">
      <ul className="flex space-x-2 sm:space-x-4 p-4 pl-0 scroll-smooth overflow-x-hidden " ref={scrollRef}>
        {
          (isStartReached === false) ?
            <CircleArrowLeft 
              size={40} 
              className="absolute -left-4 top-46 px-2 cursor-pointer text-black bg-white"
              onClick={() => {
                setIsScrolling(true)
                
                scroll(-300)
                if (scrollRef.current) {
                  if (scrollRef?.current?.scrollLeft <= 300) {
                    setIsStartReached(true)
                  } else if (scrollRef?.current?.scrollLeft > 300) {
                    setIsEndReached(false)
                  }
                }

              }}
            /> : <></>
        }

        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`/category/${category.name}`}
            className={`px-4 py-2 first:pl-0 cursor-pointer hover:underline`}
          >
            {category.name}
          </Link>
        ))}

        {
          (isEndReached === false) ?
            <CircleArrowRight 
              size={40} 
              className="absolute -right-4 top-46 p-2 cursor-pointer text-black bg-white"
              onClick={() => {
                setIsScrolling(!isScrolling)
                scroll(300)
                console.log(scrollRef.current?.scrollLeft)
                if (scrollRef.current) {
                  if (scrollRef?.current?.scrollLeft >= 0 && scrollRef?.current?.scrollLeft <= 300) {
                    setIsStartReached(false)
                  } else if (scrollRef?.current?.scrollLeft >= 900) {
                    setIsEndReached(true)
                  }
                }

              }}
            /> : <></>
        }
      </ul>
    </div>
  )
}