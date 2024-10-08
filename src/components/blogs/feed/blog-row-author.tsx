import { User } from "@/lib/definitions"
import Image from "next/image"

export default function BlogRowAuthor({ user }: { user: User }) {
  return (
    <div className="flex border-t border-gray-300 sm:h-[23%] pt-2 mt-4">
      <div className="relative flex items-center gap-x-4">
        <Image 
          src={user.image}
          alt="" 
          width={300}
          height={300}
          className="h-8 w-8 rounded-full bg-gray-50" />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#">
              <span className="absolute inset-0" />
              {user.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}