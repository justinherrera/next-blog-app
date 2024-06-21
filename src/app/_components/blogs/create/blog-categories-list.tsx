import BlogCreateCategorySelect from "./blog-create-category-select"

export default async function Categories() {
  const response = await fetch(`http://localhost:3000/api/categories`)
  const { categories } = await response.json()

  return (
    <>
      <BlogCreateCategorySelect categories={categories} />
    </>
   )
}