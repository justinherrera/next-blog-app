import { format } from "date-fns"

export default function BlogRowDetails({ name, date }: { name: string, date: Date }) {
  const now = format(new Date(), "MM/dd/yyyy") === format(new Date(date), "MM/dd/yyyy") ? "Just now" : format(new Date(date), "MM/dd/yyyy")
  return (
    <div className="flex items-center gap-x-4 text-xs h-[10%]">
      <time dateTime={format(new Date(date), "MM/dd/yyyy")} className="text-gray-500">
        {now}
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