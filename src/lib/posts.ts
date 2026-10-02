import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

// A post goes live once it isn't a draft and its pubDate (midnight UTC) has passed at build
// time. The daily scheduled deploy is what releases future-dated posts. Dev shows everything.
export function isLive(post: Post): boolean {
	if (!import.meta.env.PROD) return true;
	return !post.data.draft && !isScheduled(post);
}

export function isScheduled(post: Post): boolean {
	return post.data.pubDate.valueOf() > Date.now();
}

// Dev-only label so drafts and scheduled posts are easy to tell apart locally.
export function statusLabel(post: Post): string {
	if (post.data.draft) return ' · draft';
	if (isScheduled(post)) return ' · scheduled';
	return '';
}
