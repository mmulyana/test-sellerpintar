export type AuthForm = {
	username: string
	password: string
	role?: string
}

export type RegisterResponse = {
	id: string
	username: string
	role: string
	password: string
	createdAt: string
	updatedAt: string
}
export type LoginResponse = {
	token: string
	role: 'Admin' | 'Role'
}
