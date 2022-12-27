import { authOptions } from '$src/hooks.server';
import { getSession } from '@auth/sveltekit';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ request }) => {
	const sessionResult = await getSession(request, authOptions);

	if (sessionResult && sessionResult.user) {
		const result = await prisma.plaidSession.findFirst({
			where: {
				userId: sessionResult.user.id
			}
		});

		if (result) {
			return json({ status: true });
		}
		return json({ status: false });
	}

	return json({ status: false });
}) satisfies RequestHandler;
