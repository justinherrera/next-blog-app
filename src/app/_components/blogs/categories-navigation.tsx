"use client"

import { Category } from "@/app/lib/definitions"
import { useRef, useState } from 'react';
import { StepForward, StepBack } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'
import LoadingCategories from "./skeletons/loading-categories";

export default function CategoriesNavigation() {
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

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/categories`)
        .then((res) => res.json())
        .then(data => data.categories)

      return response
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })
  

  if (isPending) return <LoadingCategories />

  if(!data) return <p>No list of categories</p>

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
                } else if (scrollRef?.current?.scrollLeft > 300) {
                  setIsEndReached(false)
                }
              }}
            /> : <></>
        }
        {data.map((category: Category) => (
          <li
            key={category.id}
            className={`px-4 py-2 first:pl-0 cursor-pointer hover:underline`}
          >
            {category.name}
          </li>
        ))}

        {
          (isEndReached === false) ?
            <StepForward 
              size={40} 
              className="absolute -right-4 top-46  rounded-full p-2 cursor-pointer text-gray-600"
              onClick={() => {
                setIsScrolling(!isScrolling)
                scroll(300)
                if (scrollRef?.current?.scrollLeft >= 0 && scrollRef?.current?.scrollLeft <= 300) {
                  setIsStartReached(false)
                } else if (scrollRef?.current?.scrollLeft >= 900) {
                  setIsEndReached(true)
                }
              }}
            /> : <></>
        }
      </ul>
    </div>
  )
}