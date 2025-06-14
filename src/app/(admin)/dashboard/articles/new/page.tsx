'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import FormArticle from '@/features/article/components/form-article'
import { useCreateArticle } from '@/features/article/api/use-create-article'
import { useRouter } from 'next/navigation'
import { delay } from '@/shared/utils'
import { uploadImage } from '@/shared/api/upload-s3'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArticleSchema } from '@/features/article/schema'
import { ArticleForm } from '@/features/article/types'
import dynamic from 'next/dynamic'

const DynamicHeaderV2 = dynamic(
	() => import('@/shared/components/common/header-v2'),
	{ ssr: false }
)

export default function Page() {
	const router = useRouter()
	const form = useForm<ArticleForm>({
		resolver: zodResolver(ArticleSchema),
		defaultValues: {
			category: '',
			content: '',
			imageUrl: '',
			title: '',
		},
	})
	const { mutate } = useCreateArticle()

	const onSubmit = async (data: any) => {
		const imageRes = await uploadImage(data.imageUrl)
		let imageUrl = imageRes.imageUrl || undefined

		mutate(
			{
				categoryId: data.category as string,
				content: data.content,
				title: data.title,
				imageUrl,
			},
			{
				onSuccess: () => {
					delay(1500, () => {
						router.push('/dashboard/articles')
					})
				},
			}
		)
	}
	return (
		<div>
			<DynamicHeaderV2 title='Articles' />
			<div className='p-6'>
				<div className='bg-gray-50 rounded-xl border'>
					<div className='p-5'>
						<Link
							className='flex gap-2 items-center'
							href={'/dashboard/articles'}
						>
							<ArrowLeft size={20} />
							<span className='text-slate-900 font-medium'>
								Create Articles
							</span>
						</Link>
					</div>
					<div className='p-6'>
						<FormArticle form={form} onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</div>
	)
}
