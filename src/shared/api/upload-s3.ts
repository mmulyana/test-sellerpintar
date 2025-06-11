import { apiUpload } from '../constant/urls'
import http from '../lib/http'

export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
	const formData = new FormData()
	formData.append('image', file)

	const res = await http.post(apiUpload, formData)
	return res.data
}
