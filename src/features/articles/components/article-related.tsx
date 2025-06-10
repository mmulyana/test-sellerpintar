'use client'

import { useArticles } from '../api/use-articles'
import CardArticle from './card-article'

export default function ArticleRelated({ id }: { id?: string }) {
	const { data } = useArticles({ limit: 3, category: id })

	return (
		<div className='pt-10'>
			<p className='text-xl font-bold text-slate-900 mb-6'>Other articles</p>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
				{data?.data?.map((i) => (
					<CardArticle key={i.id} data={i} />
				))}
			</div>
		</div>
	)
}
