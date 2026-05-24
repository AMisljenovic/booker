export async function assertOkResponse(
	res: Response,
	resourceLabel: string,
): Promise<void> {
	if (res.ok) {
		return;
	}

	const message = getHttpErrorMessage(res.status, resourceLabel);
	throw new Error(message);
}

export function getHttpErrorMessage(
	status: number,
	resourceLabel: string,
): string {
	switch (status) {
		case 400:
			return `Bad request — ${resourceLabel}`;
		case 401:
			return `Unauthorized — ${resourceLabel}`;
		case 403:
			return `Forbidden — ${resourceLabel}`;
		case 404:
			return `Not found — ${resourceLabel}`;
		case 429:
			return `Too many requests — try again later`;
		case 500:
		case 502:
		case 503:
			return `Server error — ${resourceLabel}`;
		default:
			return `${resourceLabel} failed (${status})`;
	}
}
