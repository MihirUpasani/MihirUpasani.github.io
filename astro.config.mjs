// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://mihirupasani.github.io',
	image: {
		// Instagram media CDNs, so the build can download and optimize feed photos.
		remotePatterns: [
			{ protocol: 'https', hostname: '**.cdninstagram.com' },
			{ protocol: 'https', hostname: '**.fbcdn.net' },
		],
	},
	markdown: {
		// Leave ```mermaid blocks unhighlighted so the post page can render them as diagrams.
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
	},
});
