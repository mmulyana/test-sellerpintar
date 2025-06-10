'use client'

import { useMutation } from '@tanstack/react-query'
import { apiAuth } from '@/shared/constant/urls'
import { useRouter } from 'next/navigation'
import http from '@/shared/lib/http'
import Cookies from 'js-cookie'

import { AuthForm, RegisterResponse } from '../types'
import { AxiosResponse, isAxiosError } from 'axios'
import { authToken } from '@/shared/constant'
import { toast } from 'sonner'

export const useRegister = () => {
	return useMutation({
		mutationFn: async (data: AuthForm) => {
			return http.post<AxiosResponse<RegisterResponse>>(
				apiAuth + '/register',
				data
			)
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
