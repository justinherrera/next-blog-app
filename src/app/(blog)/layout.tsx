"use client"

import BlogNavigation from '../_components/blogs/top-navigation'
import { auth } from "../../../auth"
import NotAuthorized from '@/app/_components/auth/not-authorized'
import SideNavigation from '../_components/blogs/side-navigation'

export default function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // if (!session) return <NotAuthorized />

  return (
    <div className="w-screen">
      <BlogNavigation />
      <div className="w-full flex justify-between">
        <div className="flex flex-col w-[70%]">
          {children}
        </div>
        
        <div className="py-12 border-l border-gray-200 hidden lg:block w-[30%]">
          <SideNavigation /> 
        </div>
        
      </div>
      
    </div>
  )
}