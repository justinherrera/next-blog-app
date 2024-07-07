import { FilePenLine, Trash } from "lucide-react"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditModal({ postId }: { postId: number }) {
  const router = useRouter()

  const handleDelete = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?postId=${postId}`, {
      method: "DELETE",
    });

    console.log(response)
    router.push('/feed')

  }


  return (
    <div className="border border-gray-300 absolute top-7 right-2 w-44 rounded bg-white shadow-lg">
      <button className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-black text-left text-sm flex items-center">
        <FilePenLine className="w-4 h-4" />
        <span className="ml-2">Edit</span>
      </button>
      <button className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-left text-red-500 text-sm flex items-center" onClick={handleDelete}>
      <Trash className="w-4 h-4" />
      <span className="ml-2">Delete</span>
    </button>
    </div>
  )
}