import prisma from "@/app/utils/prisma-connect"

export async function GET(request: Request) {
  const categories = await prisma.category.findMany({})
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  
  return Response.json({ categories })
}