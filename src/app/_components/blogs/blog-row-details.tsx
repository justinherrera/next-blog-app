import { format } from "date-fns"

export default function BlogRowDetails({ name, date }: { name: string, date: Date }) {
  return (
    <div className="flex items-center gap-x-4 text-xs">
      <time dateTime={format(new Date(date), "MM/dd/yyyy")} className="text-gray-500">
        {format(new Date(date), "MM/dd/yyyy")}
      </time>
      <a
        href="#"
        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
      >
        {name}
      </a>
    </div>
  )
}