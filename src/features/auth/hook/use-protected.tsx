'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { authToken } from '@/shared/constant'

export default function useProtected() {
	const router = useRouter()
	useEffect(() => {
		const token = Cookies.get(authToken)
		if (token) {
			router.replace('/articles')
		}
	}, [])
}
