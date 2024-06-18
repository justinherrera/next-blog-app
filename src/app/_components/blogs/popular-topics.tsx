export default function PopularTopics() {
  return (
    <>
      <div className="w-full pl-14 my-6">
          <p className="font-bold">Popular topics</p>
        </div>

        <div className="w-full px-14 space-x-2">
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Remote Work
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Media
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Podcast
          </button>
        </div>
      </>
  )
}