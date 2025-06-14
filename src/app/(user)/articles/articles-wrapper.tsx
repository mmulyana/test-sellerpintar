'use client'

import { useArticles } from '@/features/article/api/use-articles'
import CardArticle from '@/features/article/components/card-article'
import TotalArticle from '@/features/article/components/total-article'
import Hero from '@/shared/components/common/hero'
import Pagination from '@/shared/components/common/pagination'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { X } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

export default function ArticleWrapper() {
	const [query, setQuery] = useQueryStates({
		page: parseAsInteger,
		search: parseAsString.withDefault(''),
		category: parseAsString.withDefault(''),
	})

	const { data, isLoading } = useArticles({
		limit: 9,
		page: query.page || 1,
		title: query.search,
		category: query.category,
	})

	const hasValue = useMemo(() => {
		return Object.values(query).some(Boolean)
	}, [query])
	return (
		<>
			<Hero />
			<div className='px-5 md:px-[100px] pt-10'>
				<div className='flex justify-between items-center'>
					<TotalArticle
						limit={9}
						page={query.page || 1}
						total={data?.total || 0}
					/>
					{hasValue && (
						<Button
							variant='outline'
							onClick={() => {
								setQuery({
									category: null,
									page: null,
									search: null,
								})
							}}
						>
							Reset
							<X />
						</Button>
					)}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-6 mb-14'>
					{isLoading ? (
						<>
							<Skeleton className='h-80 bg-gray-400 w-full' />
							<Skeleton className='h-80 bg-gray-400 w-full' />
							<Skeleton className='h-80 bg-gray-400 w-full' />
						</>
					) : (
						data?.data?.map((i) => <CardArticle data={i} key={i.id} />)
					)}
				</div>
				<Pagination total={data?.total || 0} limit={9} />
			</div>
		</>
	)
}
