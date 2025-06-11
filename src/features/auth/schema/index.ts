import { z } from 'zod'

export const AuthSchema = z.object({
	username: z.string().min(1, 'Please enter your usename'),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
	role: z.string().min(1, 'Please select your role'),
})
