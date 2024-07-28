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

  const scrollRight = (scrollOffset: number) => {
    if (scrollRef.current) {
      console.log(scrollRef.current.scrollLeft)
      const scrollWidth = scrollRef.current.scrollWidth
      // scrollRef.current.scrollLeft += scrollWidth / 2;
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const scrollLeft = (scrollOffset: number) => {
    if (scrollRef.current) {
      console.log(scrollRef.current.scrollWidth)
      const scrollWidth = scrollRef.current.scrollWidth
      scrollRef.current.scrollLeft -= scrollOffset;
    }
  };

  return(
    <div className="container py-2 sm:p-6 lg:px-0 relative">
      <ul className="flex space-x-2 sm:space-x-4 p-4 pl-0 scroll-smooth overflow-x-hidden " ref={scrollRef}>
        {
          (isStartReached === false) ?
            <div className="absolute -left-4 top-46 w-20 bg-gradient-to-r from-transparent via-white to-transparent">
              <CircleArrowLeft 
                size={40} 
                className=" px-2 cursor-pointer text-black bg-white"
                onClick={() => {
                  setIsScrolling(true)
                  
                  scrollLeft(300)
                  if (scrollRef.current) {
                    if (scrollRef?.current?.scrollLeft <= 800) {
                      setIsStartReached(true)
                    } else if (scrollRef?.current?.scrollLeft > 800) {
                      setIsEndReached(false)
                    }
                  }

                }}
              /> 
             {/* <div className="absolute -left-2 top-58 px-4 py-2 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"></div> */}
            </div>
            : <></>
        }

        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`/category/${category.name}`}
            className={`first:pl-0 px-4 py-2 cursor-pointer hover:underline`}
          >
            {category.name}
          </Link>
        ))}

        {
          (isEndReached === false) ?
            <div className="absolute -right-4 pl-8 top-46 w-20 bg-gradient-to-r from-transparent via-white to-transparent">
              <CircleArrowRight 
                size={40} 
                className="px-2 cursor-pointer text-black bg-white"
                onClick={() => {
                  setIsScrolling(!isScrolling)
                  scrollRight(300)
                  console.log(scrollRef.current?.scrollLeft)
                  if (scrollRef.current) {
                    if (scrollRef?.current?.scrollLeft >= 0 && scrollRef?.current?.scrollLeft <= 800) {
                      setIsStartReached(false)
                    } else if (scrollRef?.current?.scrollLeft >= 900) {
                      setIsEndReached(true)
                    }
                  }

                }}
              /> 
            </div>
            : <></>
        }
      </ul>
    </div>
  )
}