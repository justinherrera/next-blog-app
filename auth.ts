
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import encryptPassword from "./src/app/utils/encrypt-password"
import verifyUser from "./src/app/utils/verify-user"

const prisma = new PrismaClient()

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
      authorize: async (credentials) => {
        console.log(credentials)
        let user = null
 
        // logic to salt and hash password
        const pwHash = encryptPassword(credentials.password)
 
        // logic to verify if user exists
        user = await verifyUser(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with the their profile data
        return user
      },
    })
  ],
})