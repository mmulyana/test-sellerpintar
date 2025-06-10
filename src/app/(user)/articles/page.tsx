'use client'

import { useArticles } from '@/features/articles/api/use-articles'
import CardArticle from '@/features/articles/components/card-article'
import TotalArticle from '@/features/articles/components/total-article'
import Hero from '@/shared/components/common/hero'
import Pagination from '@/shared/components/common/pagination'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { loadSearchParams } from '@/shared/utils/search-params'
import {
	parseAsInteger,
	parseAsString,
	SearchParams,
	useQueryState,
	useQueryStates,
} from 'nuqs'

export default function Page({
	searchParams,
}: {
	searchParams: Promise<SearchParams>
}) {
	const [query] = useQueryStates({
		page: parseAsInteger.withDefault(1),
		search: parseAsString.withDefault(''),
	})

	const { data, isLoading } = useArticles({
		limit: 9,
		page: query.page,
		title: query.search,
	})

	return (
		<>
			<Hero />
			<div className='px-5 md:px-[100px] pt-10'>
				<TotalArticle limit={9} page={query.page} total={data?.total || 0} />
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
				<Pagination totalData={data?.total || 0} limit={9} />
			</div>
		</>
	)
}
