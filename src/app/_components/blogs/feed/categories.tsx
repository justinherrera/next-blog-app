import CategoriesNavigation from "./categories-navigation"

export default async function Categories() {
  const response = await fetch(`http://localhost:3000/api/categories`)
  const { categories } = await response.json()

  return (
    <>
      <CategoriesNavigation categories={categories} />
    </>
   )
}