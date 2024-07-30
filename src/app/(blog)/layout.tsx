

import { auth } from '../../../auth'
import NotAuthorized from '@/components/auth/not-authorized'
import TopNavigation from '@/components/blogs/navigations/top-navigation'
import { useEffect } from 'react'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  // if (!session) return <NotAuthorized />

  

  // useEffect(() => {
  //   const guest = JSON.parse(localStorage.getItem('user') as string);
  //   console.log(guest)

  // }, []);

  return (
    <div className="max-w-screen">
      <TopNavigation />
      {children}
    </div>
  )
}