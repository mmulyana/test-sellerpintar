'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { apiAuth } from '@/shared/constant/urls'
import http from '@/shared/lib/http'

import { AuthForm, RegisterResponse } from '../types'

export const useRegister = () => {
	return useMutation({
		mutationFn: async (data: AuthForm) => {
			return http.post<RegisterResponse>(apiAuth + '/register', data)
		},
		onSuccess: () => {
			toast.success('Akun telah terdaftar')
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || error.message
				toast.error(message)
			} else {
				toast.error(JSON.stringify(error))
			}
		},
	})
}
