import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiArticles } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

export const useDeleteArticle = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			return await http.delete(`${apiArticles}/${payload.id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.articles] })
			toast.success(data.data.message || 'Artikel berhasil dihapus')
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}
