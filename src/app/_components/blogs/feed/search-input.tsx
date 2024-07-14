"use client"

import React from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import Image from 'next/image';
import Link from 'next/link';

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL as string,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);

console.log("------> searchClient")
console.log(process.env.NEXT_PUBLIC_MEILISEARCH_URL)
console.log(process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY)

const Hit = ({ hit }: { hit: any }) => {
  console.log("------> hit")
  console.log(hit)
  return (
    <div key={hit.id} className="bg-white p-4">
      <article >
        <Link href={`/${hit.slug}`} className="font-bold">{hit.title}</Link>
      </article>
    </div>

  );
}

export default function SearchInput() {
  return (  
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
      <InstantSearch
        indexName="blog-posts"
        searchClient={searchClient}
      >
        <SearchBox className="w-full rounded-md py-1.5 pr-14 border border-gray-300 px-4 relative" />
        <InfiniteHits hitComponent={Hit} className="absolute top-10 w-full border border-gray-200 shadow-lg " />
      </InstantSearch>
        {/* <input
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
        </div> */}
      </div>
    </div>
  )
}