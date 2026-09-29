// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://mihirupasani.github.io',
	markdown: {
		// Leave ```mermaid blocks unhighlighted so the post page can render them as diagrams.
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
	},
});
