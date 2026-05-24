import Skeleton from "./ui/Skeleton";

interface ResultsSkeletonProps {
	count?: number;
}

function ResultsSkeleton({ count = 8 }: ResultsSkeletonProps) {
	return (
		<div
			className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
			aria-busy
			aria-live="polite"
		>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="h-full flex flex-col rounded-md border border-border bg-surface-card overflow-hidden"
				>
					<Skeleton className="w-full h-75 rounded-none" />
					<div className="p-2 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}

export default ResultsSkeleton;
