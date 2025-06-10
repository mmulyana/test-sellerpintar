'use client'

import useProtected from '@/features/auth/hook/use-protected'

export default function Layout({ children }: React.PropsWithChildren) {
	useProtected()
	return (
		<div className='flex justify-center items-center w-full min-h-screen'>
			<div className='max-w-full w-[400px]'>{children}</div>
		</div>
	)
}
