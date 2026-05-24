import { toast } from "sonner";

function getErrorMessage(error: unknown, fallback: string): string {
	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}

export async function withRequestToast<T>(
	errorFallback: string,
	request: () => Promise<T>,
): Promise<T> {
	try {
		return await request();
	} catch (error) {
		toast.error(getErrorMessage(error, errorFallback));
		throw error;
	}
}

export function toastRequestError(error: unknown, fallback: string): void {
	toast.error(getErrorMessage(error, fallback));
}
