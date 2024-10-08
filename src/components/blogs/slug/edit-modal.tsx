import { FilePenLine, Trash } from "lucide-react"
import Link from "next/link"

export default function EditModal({ postId, setIsDeleting, slug }: { postId: number, setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>, slug: string}) {

  return (
    <div className="border border-gray-300 absolute top-7 right-2 w-44 rounded bg-white shadow-lg">
      <button className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-black text-left text-sm flex items-center">
        <FilePenLine className="w-4 h-4" />
        <Link href={`/s/${slug}/edit`} className="ml-2">Edit</Link>
      </button>
      <button className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-left text-red-500 text-sm flex items-center" onClick={() => setIsDeleting(true)}>
      <Trash className="w-4 h-4" />
      <span className="ml-2">Delete</span>
    </button>
    </div>
  )
}