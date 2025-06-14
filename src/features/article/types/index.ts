import { z } from 'zod'
import { ArticleSchema } from '../schema'

export type Article = {
	id: string
	title: string
	content: string
	userId: string
	categoryId: string
	createdAt: string
	updatedAt: string
	imageUrl?: string
	category: {
		id: string
		name: string
		userId: string
		createdAt: string
		updatedAt: string
	}
	user: {
		id: string
		username: string
		role: 'User' | 'Admin'
	}
}

export type ArticleMutate = {
	title: string
	content: string
	categoryId: string
	imageUrl?: string
}

export type ArticleForm = z.infer<typeof ArticleSchema>
