import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import type { PreviousBook } from "../types/books";
import {
	getPreviouslyViewed,
	mergePreviouslyViewed,
	savePreviouslyViewed,
} from "../utils/previouslyViewed";

interface PreviouslyViewedContextValue {
	books: PreviousBook[];
	addBook: (book: PreviousBook) => void;
}

const PreviouslyViewedContext =
	createContext<PreviouslyViewedContextValue | null>(null);

export function PreviouslyViewedProvider({ children }: { children: ReactNode }) {
	const [books, setBooks] = useState<PreviousBook[]>(() =>
		getPreviouslyViewed(),
	);

	const addBook = useCallback((book: PreviousBook) => {
		setBooks((existing) => {
			const updated = mergePreviouslyViewed(existing, book);
			savePreviouslyViewed(updated);
			return updated;
		});
	}, []);

	const value = useMemo(() => ({ books, addBook }), [books, addBook]);

	return (
		<PreviouslyViewedContext.Provider value={value}>
			{children}
		</PreviouslyViewedContext.Provider>
	);
}

export function usePreviouslyViewed(): PreviouslyViewedContextValue {
	const context = useContext(PreviouslyViewedContext);

	if (!context) {
		throw new Error(
			"usePreviouslyViewed must be used within PreviouslyViewedProvider",
		);
	}

	return context;
}
