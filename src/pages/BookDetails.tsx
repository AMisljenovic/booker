import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCoverUrl } from "../api/openLibrary";
import { usePreviouslyViewed } from "../context/PreviouslyViewedContext";
import { useBookDetails } from "../hooks/useBookDetails";
import Skeleton from "../components/ui/Skeleton";
import TopProgress from "../components/ui/TopProgress";
import type { BookSearchResult, PreviousBook } from "../types/books";

type PreviewBook = BookSearchResult | PreviousBook;

function BackToHome({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-fit cursor-pointer rounded-md border border-border bg-surface-card px-4 py-2 text-text-primary"
		>
			← Return to home page
		</button>
	);
}

function BookDetailsMessage({
	title,
	message,
	onBack,
}: {
	title: string;
	message: string;
	onBack: () => void;
}) {
	return (
		<div className="space-y-6">
			<BackToHome onClick={onBack} />
			<div
				className="rounded-2xl border border-border bg-surface-card p-10 text-center"
				role="alert"
			>
				<p className="text-base font-medium text-text-primary">
					{title}
				</p>
				<p className="mt-2 text-sm text-text-secondary">{message}</p>
			</div>
		</div>
	);
}

function CoverBlock({ coverId, title }: { coverId?: number; title: string }) {
	return (
		<div className="shrink-0">
			{coverId ? (
				<img
					src={getCoverUrl(coverId)}
					alt={title}
					decoding="async"
					className="h-105 w-70 rounded-xl border border-border object-cover shadow-lg"
				/>
			) : (
				<div className="flex h-105 w-70 items-center justify-center rounded-xl border border-border bg-surface-card text-text-secondary">
					No cover available
				</div>
			)}
		</div>
	);
}

function BookDetailsBodySkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-11/12" />
			<Skeleton className="h-4 w-10/12" />
			<Skeleton className="h-4 w-9/12" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);
}

function BookDetailsSkeleton({ preview }: { preview?: PreviewBook }) {
	return (
		<div className="mt-8 flex flex-col gap-8 lg:flex-row">
			{preview ? (
				<CoverBlock coverId={preview.cover_i} title={preview.title} />
			) : (
				<Skeleton className="h-105 w-70 rounded-xl" />
			)}

			<div className="flex max-w-3xl flex-col gap-6 flex-1">
				<div>
					{preview ? (
						<h1 className="text-3xl font-bold leading-tight">
							{preview.title}
						</h1>
					) : (
						<Skeleton className="h-8 w-2/3" />
					)}

					<div className="mt-4 flex flex-wrap items-center gap-2">
						{preview?.author_name?.length
							? preview.author_name.map((author) => (
									<div
										key={author}
										className="rounded-full border border-border bg-surface-card px-3 py-1 text-sm text-text-secondary"
									>
										{author}
									</div>
								))
							: (
								<>
									<Skeleton className="h-6 w-24 rounded-full" />
									<Skeleton className="h-6 w-32 rounded-full" />
								</>
							)}
					</div>
				</div>

				<div className="flex flex-wrap gap-3">
					<Skeleton className="h-6 w-40 rounded-full" />
					<Skeleton className="h-6 w-32 rounded-full" />
				</div>

				<BookDetailsBodySkeleton />
			</div>
		</div>
	);
}

function BookDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	const { addBook } = usePreviouslyViewed();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, isError, error } = useBookDetails(id);

	const preview = (location.state as { preview?: PreviewBook } | null)
		?.preview;

	const goHome = () => navigate("/");

	useEffect(() => {
		if (!data) {
			return;
		}

		const coverId = data.work.covers?.[0];
		if (!coverId) {
			return;
		}

		addBook({
			key: data.work.key,
			title: data.work.title,
			cover_i: coverId,
			author_name: data.authorNames,
		});
	}, [data, addBook]);

	if (!id) {
		return (
			<BookDetailsMessage
				title="Invalid book link"
				message="This page does not include a book id."
				onBack={goHome}
			/>
		);
	}

	if (isLoading) {
		return (
			<>
				<TopProgress visible />
				<BackToHome onClick={goHome} />
				<BookDetailsSkeleton preview={preview} />
			</>
		);
	}

	if (isError) {
		return (
			<BookDetailsMessage
				title="Could not load book"
				message={
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again."
				}
				onBack={goHome}
			/>
		);
	}

	if (!data) {
		return (
			<BookDetailsMessage
				title="Book not found"
				message="We could not find details for this book."
				onBack={goHome}
			/>
		);
	}

	const { work, authorNames, edition } = data;
	const coverId = work.covers?.[0] ?? preview?.cover_i;
	const isbn = edition?.isbn_13?.[0] ?? edition?.isbn_10?.[0];
	const publisher = edition?.publishers?.[0];
	const description =
		typeof work.description === "string"
			? work.description
			: work.description?.value;

	return (
		<>
			<BackToHome onClick={goHome} />

			<div className="mt-8 flex flex-col gap-8 lg:flex-row">
				<CoverBlock coverId={coverId} title={work.title} />

				<div className="flex max-w-3xl flex-col gap-6">
					<div>
						<h1 className="text-3xl font-bold leading-tight">
							{work.title}
						</h1>

						{work.first_publish_date && (
							<p className="mt-2 text-text-secondary">
								First published: {work.first_publish_date}
							</p>
						)}

						<div className="mt-4 flex flex-wrap items-center gap-2">
							{authorNames.length > 0 ? (
								authorNames.map((author) => (
									<div
										key={author}
										className="rounded-full border border-border bg-surface-card px-3 py-1 text-sm text-text-secondary"
									>
										{author}
									</div>
								))
							) : (
								<div className="text-text-secondary">
									Unknown author
								</div>
							)}
						</div>
					</div>

					<div className="flex flex-wrap gap-3">
						{isbn && (
							<div className="rounded-full border border-border px-3 py-1 text-sm text-text-secondary">
								ISBN: {isbn}
							</div>
						)}

						{publisher && (
							<div className="rounded-full border border-border px-3 py-1 text-sm text-text-secondary">
								Publisher: {publisher}
							</div>
						)}
					</div>

					<div className="max-w-2xl leading-relaxed text-text-secondary">
						{description || "No description available"}
					</div>
				</div>
			</div>
		</>
	);
}

export default BookDetails;
