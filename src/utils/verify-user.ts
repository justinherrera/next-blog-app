
import prisma from "@/utils/prisma-connect"
import comparePassword from "@/utils/compare-password";

export default async function verifyUser(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return false
  }

  // || '' to handle the case where the user has not set a password
  const isMatch = await comparePassword(password, user.password || '')

  if (!isMatch) {
    return false
  }

  return user
}