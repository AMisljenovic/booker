interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (value: number) => void;
}

type PaginationItem = number | "ellipsis";

function getPaginationItems(
	currentPage: number,
	totalPages: number,
): PaginationItem[] {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const items: PaginationItem[] = [1];

	let start = Math.max(2, currentPage - 1);
	let end = Math.min(totalPages - 1, currentPage + 1);

	if (currentPage <= 3) {
		start = 2;
		end = 4;
	} else if (currentPage >= totalPages - 2) {
		start = totalPages - 3;
		end = totalPages - 1;
	}

	if (start > 2) {
		items.push("ellipsis");
	}

	for (let page = start; page <= end; page += 1) {
		items.push(page);
	}

	if (end < totalPages - 1) {
		items.push("ellipsis");
	}

	items.push(totalPages);

	return items;
}

function Pagination(props: PaginationProps) {
	const { currentPage, totalPages, onPageChange } = props;

	if (totalPages <= 1) {
		return null;
	}

	const pages = getPaginationItems(currentPage, totalPages);

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="rounded border px-3 py-1 disabled:opacity-50 cursor-pointer"
			>
				Prev
			</button>

			{pages.map((page, index) =>
				page === "ellipsis" ? (
					<span
						key={`ellipsis-${index}`}
						className="px-2 text-text-secondary select-none"
						aria-hidden
					>
						…
					</span>
				) : (
					<button
						type="button"
						key={page}
						onClick={() => onPageChange(page)}
						aria-current={currentPage === page ? "page" : undefined}
						className={`min-w-9 rounded border px-3 py-1 cursor-pointer ${
							currentPage === page
								? "bg-black text-white border-black"
								: ""
						}`}
					>
						{page}
					</button>
				),
			)}

			<button
				type="button"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="rounded border px-3 py-1 disabled:opacity-50 cursor-pointer"
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
