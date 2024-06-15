
import { PrismaClient } from "@prisma/client"
import comparePassword from "./compare-password";
const prisma = new PrismaClient()

export default async function verifyUser(email: string, password: string): Promise<boolean> {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return false
  }

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
    return false
  }

  return true
}