export default function BlogCreateTitleInput() {
  return (
    <div className="mt-2">
      <input
        type="text"
        name="title"
        id="title"
        className="block w-full py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 px-2 font-bold text-4xl focus:outline-none"
        placeholder="Your title goes here..."
        autoFocus
      />
    </div>
  ) 
}