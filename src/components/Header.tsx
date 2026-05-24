import { Link } from "react-router-dom";
import { usePreviouslyViewed } from "../context/PreviouslyViewedContext";

function Header() {
	const { books } = usePreviouslyViewed();

	return (
		<div className="bg-surface-card text-text-primary font-extrabold text-2xl flex justify-between items-center p-2 rounded-md">
			<Link to="/" className="flex items-center gap-2 select-none">
				📚 BookFinder
			</Link>
			{books.length > 0 && (
				<div className="font-normal text-text-secondary text-sm border-2 border-border rounded-full py-0.75 px-3.75">
					Previously Viewed ({books.length})
				</div>
			)}
		</div>
	);
}

export default Header;
