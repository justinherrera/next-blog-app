import { format, isEqual } from "date-fns"
import Link from "next/link"

export default function BlogRowDetails({ name, date }: { name: string, date: Date }) {
  const postedData = date.toString().split('T')[0]
  const currentDate = new Date().toISOString().split('T')[0]
  const now = isEqual(new Date(postedData), new Date(currentDate)) ? "Just now" : format(new Date(date), "MMMM dd, yyyy")
  return (
    <div className="flex items-center gap-x-4 text-xs h-[10%]">
      <time dateTime={format(new Date(date), "MMMM dd, yyyy")} className="text-gray-500">
        {now}
      </time>
      <Link
        href={`/category/${name}`}
        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
      >
        {name}
      </Link>
    </div>
  )
}