'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import Pagination from './pagination'
import { parseAsString, useQueryState } from 'nuqs'
import Search from './search'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	isLoading?: boolean
	action?: React.ReactNode
	limit: number
	total: number
	title?: string
	filter?: React.ReactNode
	reset?: React.ReactNode
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	action,
	limit,
	total,
	title,
	filter,
	reset,
}: DataTableProps<TData, TValue>) {
	const [search] = useQueryState('search', parseAsString.withDefault(''))

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter: search,
		},
		globalFilterFn: 'includesString',
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	const renderTableBody = () => {
		if (isLoading) {
			return (
				<>
					<TableRow className='h-28 py-0 w-fit relative'>
						<Skeleton />
					</TableRow>
					<TableRow className='h-28 py-0 w-fit relative'>
						<Skeleton />
					</TableRow>
					<TableRow className='h-28 py-0 w-fit relative'>
						<Skeleton />
					</TableRow>
				</>
			)
		}
		if (table.getRowModel().rows?.length) {
			return table.getRowModel().rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && 'selected'}
					className='border-b'
				>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id} className='text-slate-600'>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))
		}

		return (
			<TableRow>
				<TableCell colSpan={columns.length} className='h-fit py-4'>
					<div className='flex flex-col justify-center items-center py-10 space-y-4'>
						<p className='text-lg text-slate-900'>
							Create new {title || 'data'}
						</p>
						{action}
					</div>
				</TableCell>
			</TableRow>
		)
	}

	return (
		<div className='bg-[#F9FAFB] border border-border rounded-xl'>
			<div className='border-b p-6'>
				<p className='text-slate-800 font-medium'>
					Total {title || 'data'} : {total}
				</p>
			</div>
			<div className='px-6 py-[26px] flex justify-between items-center flex-col md:flex-row gap-4'>
				<div className='flex gap-2 items-center'>
					{filter}
					<Search />
					{reset}
				</div>
				{action}
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className='border-none'>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className='bg-gray-100 border-y text-slate-900 font-medium border-border text-center'
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className='relative'>{renderTableBody()}</TableBody>
			</Table>
			<div className='px-4 py-6 border-t'>
				<Pagination limit={limit} total={total} />
			</div>
		</div>
	)
}
