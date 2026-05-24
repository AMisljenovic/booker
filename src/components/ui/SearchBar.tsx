import type { SearchProps } from "../../types/search";

function SearchBar(props: SearchProps) {
	const { query, setQuery, onSearch, onClear } = props;

	return (
		<div className="flex gap-2">
			<input
				type="text"
				value={query}
				onChange={(e) => {
					const value = e.target.value;
					setQuery(value);

					if (!value.trim()) {
						onClear();
					}
				}}
				onKeyDown={(e) => {
					if (e.key !== "Enter") {
						return;
					}
					if (!query.trim()) {
						return;
					}

					onSearch(query);
				}}
				className="w-full p-2 rounded-md border border-border bg-surface-card text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-border-focus"
				placeholder="Search books..."
			/>

			<button
				onClick={() => {
					if (!query.trim()) {
						return;
					}
					onSearch(query);
				}}
				className="px-4 py-2 rounded-md bg-accent text-white cursor-pointer"
			>
				Search
			</button>
			<button
				onClick={onClear}
				className="px-4 py-2 rounded-md border border-border cursor-pointer"
			>
				Clear
			</button>
		</div>
	);
}

export default SearchBar;
