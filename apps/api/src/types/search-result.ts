import type { SearchResultType } from '#app/constants/search-result-type.js';

export type SearchResult = {
  id: string;
  itemId: string;
  type: SearchResultType;
  name: string;
  description: string;
  url: string;
  rank: number;
};
