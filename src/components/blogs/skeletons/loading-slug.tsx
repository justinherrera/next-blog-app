export default function LoadingSlug() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-300 mb-2"></div>
          <div className="w-80 h-4 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        </div>
        <div className="flex items-center mt-4 mb-4">
          <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>
        </div>
        <div role="status" className="w-full rounded shadow animate-pulse md:py-6">
            <div className="flex items-center justify-center h-64 mb-12 bg-gray-300 rounded dark:bg-gray-300">
              <svg className="h-10 text-gray-200 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}