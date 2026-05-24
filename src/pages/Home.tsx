import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PreviouslyViewed from "../components/PreviouslyViewed";
import Results from "../components/Results";
import Search from "../components/Search";
import { BOOKS_PER_PAGE } from "../api/openLibrary";
import Pagination from "../components/Pagination";
import Loader from "../components/ui/Loader";
import { useBookSearch } from "../hooks/useBookSearch";

function setSearchParamsForQuery(
	setSearchParams: ReturnType<typeof useSearchParams>[1],
	query: string,
	page: number,
) {
	const params = new URLSearchParams();
	if (query) {
		params.set("q", query);
	}
	if (page > 1) {
		params.set("page", String(page));
	}
	setSearchParams(params);
}

function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get("q")?.trim() ?? "";
	const page = Math.max(
		1,
		Number.parseInt(searchParams.get("page") ?? "1", 10) || 1,
	);

	const [query, setQuery] = useState(q);
	const { data, isFetching, isError, error } = useBookSearch(q, page);
	const hasSearch = Boolean(q);
	const books = hasSearch ? (data?.docs ?? []) : [];
	const totalCount = hasSearch ? (data?.numFound ?? 0) : 0;
	const totalPages = Math.ceil(totalCount / BOOKS_PER_PAGE);

	useEffect(() => {
		setQuery(q);
	}, [q]);

	const handleSearch = (value: string) => {
		const trimmed = value.trim();
		if (!trimmed) {
			return;
		}

		setSearchParamsForQuery(setSearchParams, trimmed, 1);
	};

	const handlePageChange = (newPage: number) => {
		setSearchParamsForQuery(setSearchParams, q, newPage);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleClear = () => {
		setSearchParams({});
		setQuery("");
	};

	return (
		<div className="flex flex-col">
			<Search
				query={query}
				setQuery={setQuery}
				onSearch={handleSearch}
				onClear={handleClear}
			/>

			{hasSearch && isFetching && <Loader />}

			{hasSearch && isError && (
				<p className="mt-4 text-red-600" role="alert">
					{error instanceof Error ? error.message : "Search failed"}
				</p>
			)}

			{hasSearch && !isFetching && !isError && books.length > 0 && (
				<>
					<Results books={books} totalCount={totalCount} />

					{totalPages > 1 && (
						<div className="flex justify-center items-center m-10">
							<Pagination
								currentPage={page}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					)}
				</>
			)}

			{hasSearch && !isFetching && !isError && books.length === 0 && (
				<div className="flex items-center justify-center rounded-2xl border border-border bg-surface-card p-10">
					<div className="text-center space-y-2">
						<p className="text-base font-medium text-text">
							No results found
						</p>
						<p className="text-sm text-text-secondary">
							Try a different search term
						</p>
					</div>
				</div>
			)}

			<PreviouslyViewed />
		</div>
	);
}

export default Home;
