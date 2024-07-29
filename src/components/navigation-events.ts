'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    if (url === '/feed?') {
      alert('You have unsaved changes. Are you sure you want to leave?')
    }
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])
 
  return null
}