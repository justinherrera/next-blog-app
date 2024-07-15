import prisma from "@/utils/prisma-connect"

export async function GET(request: Request) {
  const categories = await prisma.category.findMany({})
    .catch(async () => {
      await prisma.$disconnect()
      process.exit(1)
    })
  
  return Response.json({ categories })
}