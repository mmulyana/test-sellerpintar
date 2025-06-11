import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiCategories } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			return await http.delete(`${apiCategories}/${payload.id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.categories] })
			toast.success('Kategori berhasil disimpan')
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}
