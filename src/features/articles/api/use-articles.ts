'use client'

import { useQuery } from '@tanstack/react-query'

import { apiArticles } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import { IApi } from '@/shared/types'
import http from '@/shared/lib/http'

import { Article } from '../types'

export const useArticles = (params: {
	page?: number
	limit?: number
	title?: string
	articleId?: string
	category?: string
}) => {
	return useQuery({
		queryKey: [keys.profile, params],
		queryFn: async () => {
			const { data } = await http<IApi<Article[]>>(apiArticles, {
				params,
			})
			return data
		},
	})
}
