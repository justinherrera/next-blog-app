export default function SignInButton() {
  return (
    <button
      type="submit"
      disabled={true}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled"
    >
      Sign in
    </button>
  )
}