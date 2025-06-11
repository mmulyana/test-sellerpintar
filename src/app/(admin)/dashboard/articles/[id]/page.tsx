'use client'

import { ArrowLeft } from 'lucide-react'
import HeaderV2 from '@/shared/components/common/header-v2'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import FormArticle from '@/features/article/components/form-article'
import { useCreateArticle } from '@/features/article/api/use-create-article'
import { useParams, useRouter } from 'next/navigation'
import { delay } from '@/shared/utils'
import { uploadImage } from '@/shared/api/upload-s3'
import { useArticle } from '@/features/article/api/use-article'
import { useEffect } from 'react'
import { usePutArticle } from '@/features/article/api/use-put-article'

export default function Page() {
	const { id } = useParams()
	const router = useRouter()

	const form = useForm()

	const { data } = useArticle({ id: (id as string) || '' })
	const { mutate } = usePutArticle()

	useEffect(() => {
		if (data) {
			form.reset({
				title: data.title,
				category: data.categoryId,
				content: data.content,
				imageUrl: data.imageUrl,
			})
		}
	}, [data])

	const onSubmit = async (data: any) => {
		let imageUrl = undefined
		if (data.imageUrl) {
			const imageRes = await uploadImage(data.imageUrl)
			if (imageRes.imageUrl) {
				imageUrl = imageRes.imageUrl
			}
		} else {
			imageUrl = ''
		}

		mutate(
			{
				id: id as string,
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
			<HeaderV2 title='Articles' />
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
