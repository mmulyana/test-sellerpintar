import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiCategories } from '@/shared/constant/urls'
import { keys } from '@/shared/constant/keys'
import http from '@/shared/lib/http'

import { CategoryMutate } from '../types'

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: CategoryMutate) => {
			return await http.post(apiCategories, payload)
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
