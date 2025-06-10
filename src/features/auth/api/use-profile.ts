'use client'

import { useQuery } from '@tanstack/react-query'
import { apiAuth } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'
import { RegisterResponse } from '../types'

export const useProfile = () => {
	return useQuery({
		queryKey: [keys.profile],
		queryFn: async () => {
			const { data } = await http<Omit<RegisterResponse, 'password'>>(
				apiAuth + '/profile'
			)
			return data
		},
	})
}
