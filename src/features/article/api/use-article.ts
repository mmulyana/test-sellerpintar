'use client'

import { useQuery } from '@tanstack/react-query'

import { apiArticles } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import { IApi } from '@/shared/types'
import http from '@/shared/lib/http'

import { Article } from '../types'

export const useArticle = (params: { id: string }) => {
	return useQuery({
		queryKey: [keys.articlesDetail, params.id],
		queryFn: async () => {
			const { data } = await http<Article>(`${apiArticles}/${params.id}`)
			return data
		},
		enabled: params.id !== null && params.id !== undefined && params.id !== '',
	})
}
