export type SearchResultType = "product" | "branch" | "job" | "page";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  href: string;
}
