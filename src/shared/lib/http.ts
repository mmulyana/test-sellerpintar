import { authToken } from '@/shared/constant'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
	timeout: 30000,
	headers: {
		Accept: 'application/json',
	},
})

http.interceptors.request.use(
	(config: any) => {
		const token = Cookies.get(authToken)
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token ?? ''}`,
		}

		if (config.data && config.data instanceof FormData) {
			config.headers['Content-Type'] = 'multipart/form-data'
		} else {
			config.headers['Content-Type'] = 'application/json'
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const statusCode = error.response?.status
		const responseData = error.response?.data as { message?: string }

		if (
			statusCode === 401 ||
			statusCode === 403 ||
			responseData?.message?.toLowerCase().includes('expired') ||
			responseData?.message?.toLowerCase().includes('invalid')
		) {
			Cookies.remove(authToken)
		}

		return Promise.reject(error)
	}
)

export default http
