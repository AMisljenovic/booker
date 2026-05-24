# BookFinder

A React application for searching books via the [Open Library API](https://openlibrary.org/developers/api). Users can search by title, browse paginated results (books with covers only), open a detail page, and revisit recently viewed books.

## Features

- **Search by title** — find books on the home page with a search bar
- **Cover-only results** — only books with a cover image are shown in the grid
- **Pagination** — 8 books per page with shareable URL state (`?q=` and `?page=`)
- **Book details** — cover, authors, description, ISBN, and publisher
- **Previously viewed** — books you opened are listed on the home page (persisted in `localStorage`)
- **Error handling** — toast notifications on failed requests and inline messages on search errors

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server and build
- [React Router](https://reactrouter.com/) — client-side routing
- [TanStack Query](https://tanstack.com/query) — search data fetching and caching
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Sonner](https://sonner.emilkowal.dev/) — error toasts

## Getting started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
npm run build    # production build (TypeScript + Vite)
npm run preview  # preview production build locally
npm run lint     # ESLint
```

## Usage

1. Enter a book title and press **Search** or Enter.
2. Browse results and use pagination to see more pages.
3. Click a book to open its detail page.
4. Use **Clear** to reset the search and results.
5. Previously viewed books appear at the bottom of the home page.

Example URL with search and page:

```text
http://localhost:5173/?q=harry&page=2
```

## Open Library API

| Purpose | Endpoint |
|--------|----------|
| Search (title + cover filter) | `GET /search.json?q=title:… AND cover_i:[1 TO *]` |
| Work details | `GET /works/{id}.json` |
| Editions (ISBN, publisher) | `GET /works/{id}/editions.json` |
| Author name | `GET /authors/{id}.json` |
| Cover image | `GET https://covers.openlibrary.org/b/id/{cover_i}-L.jpg` |

Search uses Solr-style queries so `numFound` reflects only works with covers, keeping pagination consistent (8 books per page).

## Project structure

```text
src/
├── api/              # Open Library fetch helpers
├── components/       # UI (search, results, pagination, etc.)
├── constants/        # API base URLs
├── context/          # Previously viewed books state
├── hooks/            # React Query search hook
├── lib/              # Query client, HTTP errors, toasts
├── pages/            # Home and BookDetails routes
├── types/            # TypeScript interfaces
└── utils/            # localStorage helpers
```

## Design notes

- **Covers only** — the search query includes `cover_i:[1 TO *]` so the API does not return works without cover metadata. This avoids empty cards and uneven page sizes.
- **URL as source of truth** — `q` and `page` live in query params so searches and pages are bookmarkable and work with the back button.
- **React Query** — caches search pages for 5 minutes; revisiting a page avoids redundant requests.
- **ISBN and publisher** — loaded from the first edition returned by the editions endpoint, not from the work record alone.
- **Previously viewed** — stored in React context and synced to `localStorage` (max 10 items).

## License

This project is for educational / interview purposes. Data provided by [Open Library](https://openlibrary.org/).

