// Fetches recent posts from the Instagram API (Instagram Login) at build time.
// Needs INSTAGRAM_ACCESS_TOKEN: a long-lived token for a Creator/Business account.
// Without a token, or if the request fails, this returns [] so the build still succeeds.

export interface InstagramPost {
	id: string;
	caption?: string;
	permalink: string;
	image: string;
	timestamp: string;
}

interface ApiMedia {
	id: string;
	caption?: string;
	media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
	media_url?: string;
	thumbnail_url?: string;
	permalink: string;
	timestamp: string;
}

export async function getInstagramPosts(limit = 9): Promise<InstagramPost[]> {
	const token = import.meta.env.INSTAGRAM_ACCESS_TOKEN ?? process.env.INSTAGRAM_ACCESS_TOKEN;
	if (!token) {
		console.warn('[instagram] INSTAGRAM_ACCESS_TOKEN not set; skipping feed.');
		return [];
	}

	const url = new URL('https://graph.instagram.com/me/media');
	url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
	url.searchParams.set('limit', String(limit));
	url.searchParams.set('access_token', token);

	try {
		const res = await fetch(url);
		if (!res.ok) {
			// Don't log the URL: it contains the token.
			console.warn(`[instagram] API returned ${res.status}: ${await res.text()}`);
			return [];
		}
		const { data } = (await res.json()) as { data: ApiMedia[] };
		return data
			.map((m) => ({
				id: m.id,
				caption: m.caption,
				permalink: m.permalink,
				// Videos only expose a still via thumbnail_url; carousels use their first image.
				image: (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url) ?? '',
				timestamp: m.timestamp,
			}))
			.filter((p) => p.image);
	} catch (err) {
		console.warn(`[instagram] fetch failed: ${(err as Error).message}`);
		return [];
	}
}
