export default function SearchInput() {
  return (  
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="w-full rounded-md py-1.5 pr-14 border border-gray-300 px-4"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  )
}