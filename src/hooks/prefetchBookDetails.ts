import type { QueryClient } from "@tanstack/react-query";
import { bookDetailsKeys, fetchBookDetails } from "./useBookDetails";

export function prefetchBookDetails(queryClient: QueryClient, id: string) {
	return queryClient.prefetchQuery({
		queryKey: bookDetailsKeys.detail(id),
		queryFn: () => fetchBookDetails(id),
		staleTime: 5 * 60 * 1000,
	});
}
