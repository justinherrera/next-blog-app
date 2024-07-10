import Link from "next/link"


export default function BlogRowContent({ title, content, slug }: { title: string, content: string, slug: string }) {

  return (  
    <div className="sm:h-auto md:h-auto lg:h-[62%] sm:full lg:w-full text-wrap break-all overflow-hidden">
      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        <Link href={`/${slug}`}>{title}</Link>
      </h3>
      {/* <p className="mt-5 text-sm leading-6 text-gray-600" dangerouslySetInnerHTML={{ __html: content.substring(0, 200) }}></p> */}
      <p className="mt-5 text-sm leading-6 text-gray-600">{content.substring(0, 300).replace(/<[^>]+>/g, '')}</p>
    </div>
  )
}