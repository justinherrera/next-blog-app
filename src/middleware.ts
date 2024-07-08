import { auth } from "../auth"
import { NextResponse, type NextRequest} from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const protectedRoutes = ['/feed', '/create', '/profile']
  // const currentPath = request.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(currentPath)



  const currentUser = request.cookies.getAll()

  console.log("currentUser")
  console.log(request.cookies.get('authjs.session-token'))

  // if (!request.cookies.get('authjs.session-token')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  
  return NextResponse.redirect(new URL('/feed', request.url))
}

// export default auth((req) => {
//   console.log("-------------------->")
//   console.log(req.auth)
// })
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}