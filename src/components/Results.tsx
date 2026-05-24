import type { BookSearchResult } from "../types/books";
import ResultCard from "./ResultCard";

interface ResultsProps {
	books: BookSearchResult[];
	totalCount: number;
}

function Results({ books, totalCount }: ResultsProps) {
	return (
		<div>
			{books.length > 0 && <h1>Results · {totalCount} found</h1>}
			<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
				{books.map((book) => (
					<ResultCard key={book.key} book={book} />
				))}
			</div>
		</div>
	);
}

export default Results;
