import { FormState } from '@/lib/definitions'
import { toast } from 'sonner'
import { useFormStatus } from "react-dom";

export default function CreateButton({ state }: { state: FormState }) {
  const status = useFormStatus();

  return (
    <button 
      type="submit" 
      className={`mt-4 bg-black text-white py-1 px-4 rounded-2xl ${status.pending ? "cursor-wait bg-gray-400" : ""}`}
      disabled={status.pending}
    >{status.pending ? "Publishing..." : "Publish"}</button>
  )
}