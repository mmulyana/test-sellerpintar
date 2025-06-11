import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiArticles } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

import { ArticleMutate } from '../types'

export const usePutArticle = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ArticleMutate & { id: string }) => {
			return await http.put(`${apiArticles}/${payload.id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.articles] })
			toast.success("Artikel berhasil diperbarui")
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}
