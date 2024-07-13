"use client"

import React from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import Image from 'next/image';

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL as string,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);

const Hit = ({ hit }) => (
  <article key={hit.id}>
    <Image src={hit.image} alt={hit.name} />
    <h1>{hit.name}</h1>
    <p>${hit.description}</p>
  </article>
);

export default function SearchInput() {
  return (  
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
      <InstantSearch
        indexName="steam-video-games"
        searchClient={searchClient}
      >
      <SearchBox />
      <InfiniteHits hitComponent={Hit} />
      </InstantSearch>
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