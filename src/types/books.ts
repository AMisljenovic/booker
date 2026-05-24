export interface BookSearchResult {
	key: string;
	title: string;
	author_name?: string[];
	cover_i?: number;
	first_publish_year?: number;
	isbn?: string[];
	isbn_10?: string[];
	isbn_13?: string[];
}

export interface BookDetail {
	key: string;
	title: string;
	description?: string | { value?: string };
	covers?: number[];
	subjects?: string[];
	authors?: WorkAuthorRef[];
	first_publish_date?: string;
}

export interface WorkAuthorRef {
	author: {
		key: string;
	};
	type?: {
		key: string;
	};
}

export interface Author {
	name: string;
}

export interface BookEdition {
	title?: string;
	isbn_10?: string[];
	isbn_13?: string[];
	publishers?: string[];
}

export interface BookEditionsResponse {
	entries: BookEdition[];
}

export interface PreviousBook {
	key: string;
	title: string;
	cover_i?: number;
	author_name?: string[];
}
