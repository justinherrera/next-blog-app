import Link from "next/link";

const tags = [
  'Remote Work',
  'Media',
  'Podcast',
  'Technology',
  'Food',
  'Music',
  'Art',
  'Literature',
  'Sports',
  'Cooking',
  'Politics',
  'Business',
  'Science',
  'Education',
  'Entertainment',
]

const chunkArray = (array: string[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export default function PopularTopics() {
  const chunkedTags = chunkArray(tags, 5);

  return (
    <div>
      <div className="w-full pl-14 my-6">
          <p className="font-bold">Popular topics</p>
        </div>

        {
          chunkedTags.map((chunk, index) => (
            <div key={index} className="w-full px-14 space-x-2 mb-2">
              {
                chunk.map((tag, tagIndex) => (
                  <button
                  key={tagIndex}
                  type="button"
                  className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {tag}
                </button>
                ))
              }
            </div>
          )
        )}
        <div className="pl-14 mt-6">
          <Link href="#" className="font-semibold underline text-sm">See more tags</Link>
        </div>
        
      </div>
  )
}