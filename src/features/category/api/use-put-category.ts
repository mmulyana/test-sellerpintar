import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiCategories } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

import { CategoryMutate } from '../types'

export const usePutCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: CategoryMutate & { id: string }) => {
			return await http.put(`${apiCategories}/${payload.id}`, payload)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.categories] })
			toast.success('Kategori berhasil diperbarui')
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}
