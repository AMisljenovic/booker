import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import BookDetails from "./pages/BookDetails";
import { PreviouslyViewedProvider } from "./context/PreviouslyViewedContext";

function App() {
	return (
		<PreviouslyViewedProvider>
			<Toaster position="bottom-right" richColors closeButton />
			<div className="min-h-screen bg-surface text-text-primary">
				<Header />

				<div className="p-6">
					<Routes>
						<Route path={"/"} element={<Home></Home>} />
						<Route
							path="/books/:id"
							element={<BookDetails></BookDetails>}
						/>
					</Routes>
				</div>
			</div>
		</PreviouslyViewedProvider>
	);
}

export default App;
