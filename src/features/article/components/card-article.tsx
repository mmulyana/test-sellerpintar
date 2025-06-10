import parse from 'html-react-parser'
import { Suspense } from 'react'
import Link from 'next/link'

import { Badge } from '@/shared/components/ui/badge'
import { formatDate } from '@/shared/utils'

import { Article } from '../types'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

export default function CardArticle({ data }: { data?: Article }) {
	return (
		<Link href={`/articles/${data?.id}`} className='space-y-4'>
			{data?.imageUrl ? (
				<Image
					height={200}
					width={400}
					alt='image'
					src={data?.imageUrl}
					className='w-full h-[200px] md:h-[240px] rounded-xl object-cover'
				/>
			) : (
				<div className='w-full h-[200px] md:h-[240px] rounded-xl bg-gray-200 text-gray-800 flex justify-center items-center'>
					<ImageIcon size={40} />
				</div>
			)}
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
		</Link>
	)
}
