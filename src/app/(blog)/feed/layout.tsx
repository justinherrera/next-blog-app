import BlogNavigation from '../../_components/blogs/top-navigation'

export default function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlogNavigation />
      {children}
    </>
  )
}