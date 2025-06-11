import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiArticles } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

import { ArticleMutate } from '../types'

export const useCreateArticle = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ArticleMutate) => {
			return await http.post(apiArticles, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.articles] })
			toast.success('Artike berhasil disimpan')
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}
