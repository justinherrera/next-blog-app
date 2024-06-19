import prisma from "@/app/utils/prisma-connect"

const categories = [
  {
    id: 1,
    name: "Travel"
  },
  {
    id: 2,
    name: "Technology"
  },
  {
    id: 3,
    name: "Food"
  }
]

const posts = [
  {
    "title": "The Future of Artificial Intelligence",
    "content": "Artificial Intelligence (AI) is transforming industries at an unprecedented rate. This article delves into the latest advancements in AI, explores its potential future applications, and examines the ethical considerations surrounding its widespread adoption. From machine learning breakthroughs to AI-driven automation, discover how AI is reshaping our world and what the future holds.",
    "slug": "the-future-of-artificial-intelligence-1",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published": true,
    "categoryId": 2,  
    "userId": "clxg3yzqu0000pk4ws4b0ni1a" 
  },
  {
    "title": "Top 10 Programming Languages in 2024",
    "content": "Staying updated with the latest programming languages is crucial for developers. In this guide, we rank the top 10 programming languages of 2024 based on their popularity, versatility, and industry demand. From Python and JavaScript to emerging languages like Rust and Kotlin, learn about their key features, use cases, and why they stand out in today's tech landscape.",
    "slug": "top-10-programming-languages-in-2024-2",
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published": false,
    "categoryId": 2, 
    "userId": "clxg3yzqu0000pk4ws4b0ni1a" 
  },
  {
    "title": "Delicious Vegan Recipes",
    "content": "Embrace a healthier lifestyle with our collection of delicious vegan recipes. From hearty breakfasts to satisfying dinners, these plant-based dishes are not only nutritious but also incredibly tasty. Discover new flavors, cooking tips, and how to make veganism an enjoyable culinary journey.",
    "slug": "delicious-vegan-recipes-3",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published": true,
    "categoryId": 3,
    "userId": "clxg3yzqu0000pk4ws4b0ni1a"
  },
  {
    "title": "Beachside Resorts",
    "content": "Experience ultimate luxury and relaxation at the world's most stunning beachside resorts. This article takes you on a tour of exquisite destinations where pristine beaches meet opulent accommodations. Whether you're planning a romantic getaway or a family vacation, find out which resorts offer the best amenities, activities, and breathtaking views.",
    "slug": "beachside-resorts-4",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published": true,
    "categoryId": 1,
    "userId": "clxg3yzqu0000pk4ws4b0ni1a"
  },
  {
    "title": "Historical Sites to Visit",
    "content": "Travel back in time and explore the most iconic historical sites around the world. From ancient ruins to medieval castles, this guide highlights destinations rich in history and cultural significance. Learn about their origins, historical importance, and tips for making the most of your visit to these timeless treasures.",
    "slug": "historical-sites-to-visit-5",
    "imageUrl": "https://images.unsplash.com/photo-1708173176425-7f526bb5bb2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published": false,
    "categoryId": 1,
    "userId": "clxg3yzqu0000pk4ws4b0ni1a"
  }
]


async function main() {

  await prisma.post.deleteMany({})
  await prisma.category.deleteMany({})

  const createCategories = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  })

  const createPosts = await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })