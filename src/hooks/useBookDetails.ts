import { useQuery } from "@tanstack/react-query";
import { getAuthorNames, getBook, getBookEditions } from "../api/openLibrary";

export const bookDetailsKeys = {
	all: ["book"] as const,
	detail: (id: string) => [...bookDetailsKeys.all, id] as const,
};

export interface BookDetailsData {
	work: Awaited<ReturnType<typeof getBook>>;
	authorNames: string[];
	edition: Awaited<ReturnType<typeof getBookEditions>>;
}

async function fetchBookDetails(id: string): Promise<BookDetailsData> {
	const work = await getBook(id);
	const authorNames = work.authors ? await getAuthorNames(work.authors) : [];
	const edition = await getBookEditions(work.key);

	return { work, authorNames, edition };
}

export function useBookDetails(id: string | undefined) {
	return useQuery({
		queryKey: bookDetailsKeys.detail(id ?? ""),
		queryFn: () => fetchBookDetails(id!),
		enabled: Boolean(id),
	});
}
