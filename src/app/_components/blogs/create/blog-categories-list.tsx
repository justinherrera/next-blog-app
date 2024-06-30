import BlogCreateCategorySelect from "./blog-create-category-select"

export default async function Categories() {
  const response = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await response.json()

  return (
    <>
      <BlogCreateCategorySelect categories={categories} />
    </>
   )
}