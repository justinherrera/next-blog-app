"use client"

import { Category } from "@/app/lib/definitions"
import { useRef, useState } from 'react';
import { StepForward, StepBack } from 'lucide-react';

export default function CategoriesNavigation({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isScrolling, setIsScrolling] = useState(false)
  const [isStartReached, setIsStartReached] = useState(true)
  const [isEndReached, setIsEndReached] = useState(false)

  const scroll = (scrollOffset: number) => {
    // console.log(scrollRef.current.scrollLeft)
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  console.log(scrollRef?.current?.scrollLeft)
  console.log(isStartReached)
  return(
    <div className="container p-6 relative">

      <ul className="flex space-x-4 p-4 pl-0 scroll-smooth overflow-x-hidden " ref={scrollRef}>
        {
          (isStartReached === false) ?
            <StepBack 
              size={40} 
              className="absolute -left-4 top-46 rounded-full px-2 cursor-pointer text-gray-600"
              onClick={() => {
                setIsScrolling(true)
                
                scroll(-300)
                if (scrollRef?.current?.scrollLeft <= 300) {
                  setIsStartReached(true)
                }
              }}
            /> : <></>
        }

        

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
          className="absolute -right-4 top-46  rounded-full p-2 cursor-pointer text-gray-600"
          onClick={() => {
            setIsScrolling(true)
            
            scroll(300)

            if (scrollRef?.current?.scrollLeft >= 0) {
              setIsStartReached(false)
            }

          }}
        />
        {/* {
          (!isEndReached) ?
          (scrollRef?.current?.scrollLeft !== undefined) ? 
            (scrollRef?.current?.scrollLeft <= 0) ? 
            <StepForward 
            size={40} 
            className="absolute -right-4 top-46  rounded-full p-2 cursor-pointer text-gray-600"
            onClick={() => {
              setIsScrolling(true)
              setIsStartReached(false)
              scroll(300)

              if (scrollRef?.current?.scrollLeft === 300) {
                setIsStartReached(true)
              }

            }}
            /> : <></>
          : <></>
          : <></>
        } */}

      </ul>
      

    </div>
  )
}