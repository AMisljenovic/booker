interface TopProgressProps {
	visible: boolean;
}

function TopProgress({ visible }: TopProgressProps) {
	if (!visible) return null;

	return (
		<div
			className="fixed top-0 left-0 right-0 z-50 h-0.5 overflow-hidden bg-transparent"
			aria-hidden
		>
			<div className="h-full w-1/3 bg-accent animate-[topprogress_1.2s_ease-in-out_infinite]" />
			<style>{`
				@keyframes topprogress {
					0%   { transform: translateX(-100%); }
					100% { transform: translateX(400%); }
				}
			`}</style>
		</div>
	);
}

export default TopProgress;
