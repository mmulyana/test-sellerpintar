import { Badge } from '@/shared/components/ui/badge'
import { formatDate } from '@/shared/utils'
import { Article } from '../types'
import parse from 'html-react-parser'
import { Suspense } from 'react'
export default function CardArticle({ data }: { data?: Article }) {
	return (
		<div className='space-y-4'>
			<img
				src='/assets/background.jpg'
				className='w-full h-[200px] md:h-[240px] rounded-xl'
			/>
			<div className='space-y-2'>
				<p className='text-slate-600'>{formatDate(data?.createdAt || '')}</p>
				<p className='text-slate-900 text-lg font-semibold'>{data?.title}</p>
				<Suspense>
					<div className='text-slate-600 prose-sm'>
						{parse(data?.content.slice(0, 140) || '')}
					</div>
				</Suspense>
				<Badge className='bg-blue-200 text-blue-900 font-normal'>
					{data?.category.name}
				</Badge>
			</div>
		</div>
	)
}
