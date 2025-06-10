'use client'

import { useQuery } from '@tanstack/react-query'

import { apiCategories } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import { IApi } from '@/shared/types'
import http from '@/shared/lib/http'
import { Category } from '../types'

export const useCategories = (params: {
	page?: number
	limit?: number
	search?: string
}) => {
	return useQuery({
		queryKey: [keys.categories, params],
		queryFn: async () => {
			const { data } = await http<IApi<Category[]>>(apiCategories, {
				params,
			})
			return data
		},
	})
}
