export default function NoPostsFound( { message }: { message: string }) {
  return (
    <div className="bg-white p-6 text-center mt-10">
      <h1 className="text-2xl font-semibold text-gray-800">No posts found 😔</h1>
      <p className="mt-4 text-gray-600">{!message ? "It looks like there are no posts available at the moment. Please check back later." : message}</p>
    </div>
  )
}