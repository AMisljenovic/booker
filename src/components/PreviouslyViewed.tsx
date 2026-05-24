import { Link } from "react-router-dom";
import { getCoverUrl } from "../api/openLibrary";
import { usePreviouslyViewed } from "../context/PreviouslyViewedContext";

function PreviouslyViewed() {
	const { books } = usePreviouslyViewed();

	return (
		<section className="mt-12">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-2xl font-bold text-text-primary">
						Previously Viewed
					</h2>

					<p className="text-sm text-text-secondary mt-1">
						Books you recently opened
					</p>
				</div>
			</div>

			<div className="flex gap-3 overflow-x-auto py-2">
				{books.map((book) => (
					<Link
						key={book.key}
						className="min-w-45 max-w-125 flex gap-2 p-2 rounded-lg border border-border bg-surface-card hover:bg-surface-elevated"
						to={`/books/${book.key.split("/").pop()}`}
					>
						{book.cover_i && (
							<img
								src={getCoverUrl(book.cover_i)}
								className="w-10 h-14 object-cover rounded"
							/>
						)}
						<div className="flex flex-col justify-center">
							<p className="text-xs font-medium line-clamp-2">
								{book.title}
							</p>
							<p className="text-[10px] text-text-secondary line-clamp-1">
								{book.author_name?.join(", ")}
							</p>
						</div>
					</Link>
				))}
			</div>

			{books.length === 0 && (
				<div className="rounded-2xl border border-border bg-surface-card p-6">
					<p className="text-text-secondary">
						No recently viewed books yet.
					</p>
				</div>
			)}
		</section>
	);
}

export default PreviouslyViewed;
