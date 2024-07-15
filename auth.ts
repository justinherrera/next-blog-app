
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"
import encryptPassword from "./src/utils/encrypt-password"
import verifyUser from "./src/utils/verify-user"
import { signInSchema } from "./src/lib/validator"
import prisma from "@/utils/prisma-connect"

type Credentials = {
  email: string
  password: string  
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
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