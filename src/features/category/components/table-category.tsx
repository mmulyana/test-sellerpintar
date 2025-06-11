'use client'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/shared/components/common/data-table'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useMemo } from 'react'
import { X } from 'lucide-react'
import { useCategories } from '../api/use-categories'
import { Category } from '../types'
import ModalAddCategory from './modal-add-category'
import ModalEditCategory from './modal-edit-category'
import DestoryCategoryConfirm from './destroy-category-confirm'

const limit = 10

export default function TableCategory() {
	const [query, setQuery] = useQueryStates({
		page: parseAsInteger,
		search: parseAsString.withDefault(''),
	})
	const { data } = useCategories({
		page: query.page || 1,
		limit,
		search: query.search,
	})

	const column: ColumnDef<Category>[] = [
		{
			id: 'Thumbnails',
			header: () => <p className='text-center text-slate-900'>Thumbnails</p>,
			cell: ({ row }) => (
				<p className='text-center text-slate-600'>{row.original.name}</p>
			),
		},
		{
			header: 'Created at',
			cell: ({ row }) => (
				<p className='text-center text-slate-600'>
					{format(new Date(row.original.createdAt), 'dd MMMM, yyyy HH:mm:ss', {
						locale: id,
					})}
				</p>
			),
		},
		{
			header: 'Action',
			cell: ({ row }) => (
				<div className='flex gap-3 items-center justify-center'>
					<ModalEditCategory id={row.original.id} name={row.original.name} />
					<DestoryCategoryConfirm
						id={row.original.id}
						name={row.original.name}
					/>
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
			total={data?.totalData || 0}
			title='Category'
			reset={
				hasValue && (
					<Button
						variant='outline'
						onClick={() => {
							setQuery({
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
			action={<ModalAddCategory />}
		/>
	)
}
