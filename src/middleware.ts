import { auth } from "../auth"
import { NextResponse, type NextRequest} from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const protectedRoutes = ['/feed', '/create', '/profile']
  // const currentPath = request.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(currentPath)



  const currentUser = request.cookies.get('currentUser')?.value
  console.log(`---> ${currentUser}`)
  
  // return NextResponse.redirect(new URL('/feed', request.url))
}

// export default auth((req) => {
//   console.log(req.nextUrl.pathname)
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
// })
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/feed',
}