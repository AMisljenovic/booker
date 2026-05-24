import { API } from "../constants/api";
import { assertOkResponse } from "../lib/httpError";
import { withRequestToast } from "../lib/requestToast";
import type {
	Author,
	BookDetail,
	BookEdition,
	BookEditionsResponse,
	BookSearchResult,
	WorkAuthorRef,
} from "../types/books";
import { toastRequestError } from "../lib/requestToast";

export const BOOKS_PER_PAGE = 8;
const SEARCH_FIELDS =
	"key,title,author_name,cover_i,first_publish_year,isbn,isbn_10,isbn_13";

export interface SearchBooksWithCoversResult {
	docs: BookSearchResult[];
	numFound: number;
}

function buildCoverSearchQuery(title: string): string {
	const trimmed = title.trim();
	const titleClause = trimmed.includes(" ")
		? `title:"${trimmed.replace(/"/g, '\\"')}"`
		: `title:${trimmed}`;

	return `${titleClause} AND cover_i:[1 TO *]`;
}

async function fetchSearchResults(
	query: string,
	page: number,
): Promise<SearchBooksWithCoversResult> {
	const offset = (page - 1) * BOOKS_PER_PAGE;
	const params = new URLSearchParams({
		q: buildCoverSearchQuery(query),
		offset: String(offset),
		limit: String(BOOKS_PER_PAGE),
		facet: "false",
		fields: SEARCH_FIELDS,
	});

	const res = await fetch(`${API.BASE}/search.json?${params}`);
	await assertOkResponse(res, "search");
	const data = await res.json();

	return {
		docs: data.docs ?? [],
		numFound: data.numFound ?? 0,
	};
}

export function searchBooksWithCovers(
	query: string,
	page = 1,
): Promise<SearchBooksWithCoversResult> {
	return withRequestToast("Search failed", () =>
		fetchSearchResults(query, page),
	);
}

async function fetchBook(id: string): Promise<BookDetail> {
	const res = await fetch(`${API.BASE}/works/${id}.json`);
	await assertOkResponse(res, "book");
	return res.json();
}

export function getBook(id: string): Promise<BookDetail> {
	return withRequestToast("Could not load book", () => fetchBook(id));
}

async function fetchBookEditions(workKey: string): Promise<BookEdition | null> {
	const res = await fetch(`${API.BASE}${workKey}/editions.json`);
	await assertOkResponse(res, "editions");
	const data = (await res.json()) as BookEditionsResponse;
	return data.entries?.[0] ?? null;
}

export function getBookEditions(workKey: string): Promise<BookEdition | null> {
	return withRequestToast("Could not load edition details", () =>
		fetchBookEditions(workKey),
	);
}

export async function getAuthorNames(
	authorRefs: WorkAuthorRef[],
): Promise<string[]> {
	try {
		const results = await Promise.all(
			authorRefs.map(async (ref) => {
				const authorId = ref.author.key.split("/").pop();

				if (!authorId) {
					return "";
				}

				const data = await getAuthor(authorId);
				return data.name;
			}),
		);

		return results.filter(Boolean);
	} catch (error) {
		toastRequestError(error, "Could not load authors");
		return [];
	}
}

export async function getAuthor(id: string): Promise<Author> {
	const res = await fetch(`${API.BASE}/authors/${id}.json`);
	await assertOkResponse(res, "author");
	return res.json();
}

export const getCoverUrl = (
	coverId?: number,
	size: "S" | "M" | "L" = "L",
): string | undefined => {
	if (!coverId) return undefined;
	return `${API.COVERS}/${coverId}-${size}.jpg`;
};
