"use client"

import React from 'react';
import { InstantSearch, SearchBox, InfiniteHits, useInstantSearch } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import Image from 'next/image';
import Link from 'next/link';

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL as string,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);

const Hit = ({ hit }: { hit: any }) => {
  return (
    <div key={hit.id} className="bg-white p-4 hover:bg-gray-200">
      <Link href={`/${hit.slug}`} className=" ">{hit.title}</Link>
    </div>

  );
}

function EmptyQueryBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

export default function SearchInput() {
  
  return (  
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
      <InstantSearch
        indexName="posts"
        searchClient={searchClient}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <SearchBox className="w-full rounded-md py-1.5 pr-14 border border-gray-300 px-4 relative" />
        <EmptyQueryBoundary fallback={null}>
          {/* <Hits /> */}
          <InfiniteHits hitComponent={Hit} className="absolute top-10 w-full border border-gray-200 shadow-lg " />
        </EmptyQueryBoundary>
      </InstantSearch>
      </div>
    </div>
  )
}