'use client'

import Profile from '@/features/auth/components/profile'
import dynamic from 'next/dynamic'

const DynamicHeaderV2 = dynamic(
	() => import('@/shared/components/common/header-v2'),
	{ ssr: false }
)

export default function Page() {
	return (
		<div>
			<DynamicHeaderV2 title='User Profile' />
			<div className='p-6'>
				<div className='flex justify-center items-center w-full h-full py-20 bg-white'>
					<Profile />
				</div>
			</div>
		</div>
	)
}
