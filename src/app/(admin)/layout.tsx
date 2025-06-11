'use client'

import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/shared/components/common/sidebar'), {
	ssr: false,
})

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-screen w-full flex'>
			<Sidebar />
			<div className='w-full h-full'>{children}</div>
		</div>
	)
}
