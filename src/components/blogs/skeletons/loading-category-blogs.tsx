export default function LoadingCategoryBlogs() {
  return (
    <div className="bg-white py-24 sm:py-32 animate-pulse">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex-col flex items-center justify-center">
          <div className="w-52 h-4 bg-gray-200 rounded-full dark:bg-gray-300 mb-2"></div>
          <div className="w-72 h-2.5 bg-gray-200 rounded-full dark:bg-gray-300"></div>
          
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {
            [1, 2, 3].map((element: number) => {
              return (
                <div key={element}>
                  <div  className="flex items-center justify-center h-64 mb-4 bg-gray-300 rounded dark:bg-gray-300">
                    <svg className="h-10 text-gray-200 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                  </div>
                  <div className="w-52 h-4 bg-gray-200 rounded-full dark:bg-gray-300 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
     
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}