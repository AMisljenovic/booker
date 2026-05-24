import type { QueryClient } from "@tanstack/react-query";
import { searchBooksWithCovers } from "../api/openLibrary";
import { bookSearchKeys } from "./useBookSearch";

export function prefetchBookSearch(
	queryClient: QueryClient,
	query: string,
	page: number,
) {
	if (!query) return;
	return queryClient.prefetchQuery({
		queryKey: bookSearchKeys.list(query, page),
		queryFn: () => searchBooksWithCovers(query, page),
		staleTime: 5 * 60 * 1000,
	});
}
