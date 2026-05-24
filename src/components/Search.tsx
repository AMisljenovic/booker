import SearchBar from "./ui/SearchBar";
import type { SearchProps } from "../types/search";

function Search(props: SearchProps) {
	const { query, setQuery, onSearch, onClear } = props;

	return (
		<section className="space-y-3">
			<h1 className="text-2xl font-bold text-neutral-faint m-0">
				Find your next read
			</h1>
			<p className="text-text-secondary">
				Search millions of books from the Open Library
			</p>
			<SearchBar
				query={query}
				setQuery={setQuery}
				onSearch={onSearch}
				onClear={onClear}
			/>
		</section>
	);
}

export default Search;
