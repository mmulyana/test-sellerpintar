'use client'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ImageIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '../types'
import { DataTable } from '@/shared/components/common/data-table'
import { useArticles } from '../api/use-articles'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import CategorySelect from '@/features/category/components/category-select'
import { useMemo } from 'react'
import { X } from 'lucide-react'
import DestoryArticleConfirm from './destroy-article-confirm'

const limit = 10

export default function TableArticles() {
	const [query, setQuery] = useQueryStates({
		page: parseAsInteger,
		search: parseAsString.withDefault(''),
		category: parseAsString.withDefault(''),
	})
	const { data } = useArticles({
		category: query.category,
		page: query.page || 1,
		limit,
		title: query.search,
	})

	const column: ColumnDef<Article>[] = [
		{
			id: 'Thumbnails',
			header: () => <p className='text-center text-slate-900'>Thumbnails</p>,
			cell: ({ row }) => (
				<div className='px-20'>
					{row.original.imageUrl ? (
						<Image
							alt='thumbnail'
							height={60}
							width={60}
							src={row.original.imageUrl || ''}
							className='rounded-lg h-[60px] w-[60px] object-cover'
						/>
					) : (
						<div className='h-[60px] w-[60px] rounded-lg bg-gray-200 text-gray-600 flex justify-center items-center'>
							<ImageIcon size={32} />
						</div>
					)}
				</div>
			),
		},
		{
			header: 'Title',
			accessorKey: 'title',
		},
		{
			header: 'Category',
			cell: ({ row }) => row.original.category.name,
		},
		{
			header: 'Created at',
			cell: ({ row }) =>
				format(new Date(row.original.createdAt), 'dd MMMM, yyyy HH:mm:ss', {
					locale: id,
				}),
		},
		{
			header: 'Action',
			cell: ({ row }) => (
				<div className='flex gap-3 items-center'>
					<Link
						href={`/articles/${row.original.id}`}
						className='text-blue-600 underline'
					>
						Preview
					</Link>
					<Link
						href={`/dashboard/articles/${row.original.id}`}
						className='text-blue-600 underline'
					>
						Edit
					</Link>
					<DestoryArticleConfirm id={row.original.id} />
				</div>
			),
		},
	]

	const hasValue = useMemo(() => {
		return Object.values(query).some(Boolean)
	}, [query])

	return (
		<DataTable
			columns={column}
			data={data?.data || []}
			limit={limit}
			total={data?.total || 0}
			title='Articles'
			reset={
				hasValue && (
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
				)
			}
			filter={<CategorySelect />}
			action={
				<Link
					className={buttonVariants({
						variant: 'default',
					})}
					href='/dashboard/articles/new'
				>
					<Plus size={20} />
					Add Articles
				</Link>
			}
		/>
	)
}
