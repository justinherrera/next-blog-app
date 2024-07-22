import BlogCreateCategorySelect from "@/components/blogs/create/blog-create-category-select"

export default async function Categories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
  const { categories } = await response.json()

  return (
    <>
      <BlogCreateCategorySelect categories={categories} />
    </>
   )
}