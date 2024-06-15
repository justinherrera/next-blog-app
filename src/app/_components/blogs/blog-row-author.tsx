import Image from "next/image"

export default function BlogRowAuthor({ user }: { user: string | null }) {
  return (
    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
      <div className="relative flex items-center gap-x-4">
        <Image 
          src="https://lh3.googleusercontent.com/a/ACg8ocIMoIzHlWgkUOENV4-tWWeZYkSvfu0VeWrupPuYKO3NlSwXBnI7Tg=s96-c"
          alt="" 
          width={300}
          height={300}
          className="h-10 w-10 rounded-full bg-gray-50" />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#">
              <span className="absolute inset-0" />
              {user}
            </a>
          </p>
          <p className="text-gray-600">Software Engineer</p>
        </div>
      </div>
    </div>
  )
}