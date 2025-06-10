'use client'

import { useMutation } from '@tanstack/react-query'
import { apiAuth } from '@/shared/constant/urls'
import http from '@/shared/lib/http'
import Cookie from 'js-cookie'

import { AuthForm, LoginResponse } from '../types'
import { AxiosResponse, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { authToken } from '@/shared/constant'

export const useLogin = () => {
	return useMutation({
		mutationFn: async (data: Omit<AuthForm, 'role'>) => {
			return http.post<LoginResponse>(apiAuth + '/login', data)
		},
		onSuccess: (data) => {
			Cookie.set(authToken, data.data.token, {
				expires: 1,
			})
			toast.success('Selamat datang kembali')
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || error.message
				toast.error(message)
			} else {
				console.log(error)
			}
		},
	})
}
