import CategoriesNavigation from "@/components/blogs/feed/categories-navigation"

export default async function Categories() {
  const response = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await response.json()

  return (
    <>
      <CategoriesNavigation categories={categories} />
    </>
   )
}