export interface SearchProps {
	query: string;
	setQuery: (value: string) => void;
	onSearch: (value: string) => void;
	onClear: () => void;
}
