
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import encryptPassword from "./src/app/utils/encrypt-password"
import verifyUser from "./src/app/utils/verify-user"
import { signInSchema } from "./src/app/lib/validator"
import prisma from "@/app/utils/prisma-connect"

type Credentials = {
  email: string
  password: string  
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // authorize: async (credentials) => {
      //   console.log(credentials)
      //   let user = null
      // */ gives "You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file" issue, try to replace bcrypt with bcryptjs soon
      //   const { email, password } = await signInSchema.parseAsync(credentials)
 
      //   // logic to salt and hash password
      //   const pwHash = await encryptPassword(password)
 
      //   // logic to verify if user exists
      //   user = await verifyUser(email, pwHash)
 
      //   if (!user) {
      //     // No user found, so this is their first attempt to login
      //     // meaning this is also the place you could do registration
      //     throw new Error("User not found.")
      //   }
 
      //   // return user object with the their profile data
      //   return user
      // },
    })
  ],
})