
import { PrismaClient } from "@prisma/client"
import comparePassword from "./compare-password";
const prisma = new PrismaClient()

export default async function verifyUser(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return false
  }

  console.log(user)

  // || '' to handle the case where the user has not set a password
  const isMatch = await comparePassword(password, user.password || '')

  if (!isMatch) {
    return false
  }

  return user
}