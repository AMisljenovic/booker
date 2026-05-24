import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchBooksWithCovers } from "../api/openLibrary";

export const bookSearchKeys = {
	all: ["search"] as const,
	list: (query: string, page: number) =>
		[...bookSearchKeys.all, query, page] as const,
};

export function useBookSearch(query: string, page: number) {
	return useQuery({
		queryKey: bookSearchKeys.list(query, page),
		queryFn: () => searchBooksWithCovers(query, page),
		enabled: Boolean(query),
		placeholderData: keepPreviousData,
	});
}
