import type { BookSearchResult } from "../types/books";
import { getCoverUrl } from "../api/openLibrary";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchBookDetails } from "../hooks/prefetchBookDetails";

interface ResultCardProps {
	book: BookSearchResult;
}

function ResultCard({ book }: ResultCardProps) {
	const queryClient = useQueryClient();
	const id = book.key.split("/").pop() ?? "";

	const prefetch = () => {
		if (id) prefetchBookDetails(queryClient, id);
	};

	return (
		<Link
			to={`/books/${id}`}
			state={{ preview: book }}
			onMouseEnter={prefetch}
			onFocus={prefetch}
			onTouchStart={prefetch}
			className="h-full flex flex-col rounded-md border border-border bg-surface-card text-text-primary overflow-hidden cursor-pointer"
		>
			<div className="w-full h-75 bg-surface-elevated">
				{book.cover_i && (
					<img
						src={getCoverUrl(book.cover_i)}
						alt={book.title}
						loading="lazy"
						decoding="async"
						className="w-full h-full object-contain"
					/>
				)}
			</div>

			<div className="p-2">
				<h2 className="font-bold">{book.title}</h2>
				<p className="text-text-secondary">
					{book.author_name?.join(", ")}
				</p>
			</div>
		</Link>
	);
}

export default ResultCard;
