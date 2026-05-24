import type { PreviousBook } from "../types/books";

const KEY = "previously_viewed_books";
const MAX_ITEMS = 10;

export const getPreviouslyViewed = (): PreviousBook[] => {
	const data = localStorage.getItem(KEY);

	if (!data) {
		return [];
	}

	return JSON.parse(data);
};

export const savePreviouslyViewed = (books: PreviousBook[]): void => {
	localStorage.setItem(KEY, JSON.stringify(books));
};

export const mergePreviouslyViewed = (
	existing: PreviousBook[],
	book: PreviousBook,
): PreviousBook[] => {
	const filtered = existing.filter((b) => b.key !== book.key);
	return [book, ...filtered].slice(0, MAX_ITEMS);
};
