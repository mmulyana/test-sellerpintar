import { Article } from '@/features/article/types'
import { apiArticles } from '@/shared/constant/urls'
import { formatDate } from '@/shared/utils'
import Image from 'next/image'
import parse from 'html-react-parser'
import ArticleRelated from '@/features/article/components/article-related'
import { SafeHtmlRenderer } from '@/shared/components/common/safe-html-renderer'

async function getArticle(id: string) {
	const res = await fetch(`${apiArticles}/${id}`, {
		cache: 'no-store',
	})

	if (!res.ok) {
		throw new Error('Failed to fetch article')
	}

	return res.json()
}

export default async function DetailPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const article: Article = await getArticle(id)

	return (
		<div className='w-[1120px] max-w-full mx-auto px-5 md:px-0 pt-10'>
			<div className='flex justify-center gap-2 text-slate-600 items-center'>
				<p>{formatDate(article.createdAt)}</p>
				<div className='h-1.5 w-1.5 rounded-full bg-slate-600'></div>
				<p>Created by {article.user.username}</p>
			</div>
			<p className='max-w-[642px] mx-auto text-center text-3xl text-slate-900 font-semibold mt-4 mb-10'>
				{article.title}
			</p>
			<Image
				src={article.imageUrl as string}
				height={480}
				width={1120}
				alt='image'
				className='rounded-xl mb-10'
			/>
			<div className='mb-10'>
				<SafeHtmlRenderer htmlContent={article.content} />
			</div>
			<ArticleRelated id={article.categoryId} />
		</div>
	)
}
