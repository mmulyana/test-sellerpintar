'use client'

import TableCategory from '@/features/category/components/table-category'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const DynamicHeaderV2 = dynamic(
	() => import('@/shared/components/common/header-v2'),
	{ ssr: false }
)
export default function Page() {
	return (
		<div>
			<DynamicHeaderV2 title='Category' />
			<div className='p-6'>
				<Suspense>
					<TableCategory />
				</Suspense>
			</div>
		</div>
	)
}
