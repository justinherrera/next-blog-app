import Image from "next/image"
import PopularTopics from "./popular-topics"

const people = [
  {
    name: 'Leslie Alexander',
    email: 'Software Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    email: 'Data Analyst',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    email: 'Project Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    email: 'UX/UI Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Courtney Henry',
    email: 'DevOps Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // {
  //   name: 'Tom Cook',
  //   email: 'tom.cook@example.com',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  // },
]

export default function SideNavigation() {
  return (
    <div className="border-l border-gray-200 w-[30%] ml-20 ">
          {/* <p>Authors</p> */}
      <div className="w-full pl-14 mb-4">
        <p className="font-bold">Who to follow</p>
      </div>
      
      <ul role="list" className="divide-y divide-gray-100 flex flex-col items-center">
        {people.map((person) => (
          <li key={person.email} className="flex items-center justify-between gap-x-6 py-5 w-[80%]">
            <div className="flex min-w-0 gap-x-4">
              <Image 
                className="h-12 w-12 flex-none rounded-full bg-gray-50" 
                height={100}
                width={100}
                src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <a
              href="#"
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Follow
            </a>
          </li>
        ))}
      </ul>
      <PopularTopics />
  </div>
  )
}