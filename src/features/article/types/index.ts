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
