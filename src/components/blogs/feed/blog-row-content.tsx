import Link from "next/link"


const extractContent = (text: string) => {
  const content = text.match(/[^\.!\?]+[\.!\?]+/g);
  if (content && content.length >= 2) {
    return content[0] + " " + content[1] + content[2];
  } else if (content && content.length === 1) {
    return content[0];
  } else {
    return ""; 
  }
}

export default function BlogRowContent({ title, content, slug }: { title: string, content: string, slug: string }) {



  return (  
    <div className="sm:h-auto md:h-auto lg:h-[62%] sm:full lg:w-full text-wrap break-all overflow-hidden">
      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-1 hover:text-gray-500">
        <Link href={`/${slug}`}>{title}</Link>
      </h3>
      <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-4">{content.replace(/<[^>]+>/g, '')}</p>
    </div>
  )
}