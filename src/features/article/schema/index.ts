import { z } from 'zod'

export const ArticleSchema = z.object({
	title: z.string().min(1, 'Please enter title'),
	category: z.string().min(1, 'Please select category'),
	imageUrl: z.any().refine((file) => file instanceof File && file.size > 0, {
		message: 'Please enter picture',
	}),
	content: z.string().min(1, 'Content field cannot be empty'),
})
