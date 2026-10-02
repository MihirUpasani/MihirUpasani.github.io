import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
		// Posts sharing a series name get a parts list; part sets their order.
		series: z.string().optional(),
		part: z.number().int().positive().optional(),
	}),
});

export const collections = { blog };
