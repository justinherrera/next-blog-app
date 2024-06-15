import { auth } from "./auth"
import { NextResponse, type NextRequest} from "next/server"

export default auth((req) => {
  console.log(req.nextUrl.pathname)
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})