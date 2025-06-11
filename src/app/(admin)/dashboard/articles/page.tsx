'use client'

import TableArticles from '@/features/article/components/table-article'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const DynamicHeaderV2 = dynamic(
	() => import('@/shared/components/common/header-v2'),
	{ ssr: false }
)

export default function Page() {
	return (
		<div>
			<DynamicHeaderV2 title='Articles' />
			<div className='p-6'>
				<Suspense>
					<TableArticles />
				</Suspense>
			</div>
		</div>
	)
}
