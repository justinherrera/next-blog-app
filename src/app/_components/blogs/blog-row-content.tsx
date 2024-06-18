import Link from "next/link"


export default function BlogRowContent({ title, content, slug }: { title: string, content: string, slug: string }) {

  return (  
    <div className="group relative max-w-xl">
      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        <Link href={`/${slug}`}>{title}</Link>
        {/* <a href="#">
          <span className="absolute inset-0" />
          {title}
        </a> */}
      </h3>
      <p className="mt-5 text-sm leading-6 text-gray-600">{content}</p>
    </div>
  )
}