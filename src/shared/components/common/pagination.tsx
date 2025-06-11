'use client'

import { useQueryStates, parseAsInteger } from 'nuqs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { cn } from '@/shared/utils'

import { Button } from '../ui/button'

export default function Pagination({
	total,
	limit,
}: {
	total: number
	limit: number
}) {
	const totalPages = Math.ceil(total / limit)

	const [queryStates, setQueryStates] = useQueryStates({
		page: parseAsInteger.withDefault(1),
	})
	const currentPage = queryStates.page

	const pageNumbers = []
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i)
	}

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setQueryStates({ page })
		}
	}

	return (
		<div className='flex justify-center flex-wrap'>
			<Button
				variant='ghost'
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={cn(
					'text-slate-900 h-10 hover:bg-white py-0',
					currentPage === 1 ? '#f0f0f0' : '#fff'
				)}
			>
				<ChevronLeft size={16} />
				Previous
			</Button>

			<ul className='flex gap-2 flex-wrap'>
				{pageNumbers.map((number) => (
					<li key={number}>
						<Button
							variant='ghost'
							onClick={() => handlePageChange(number)}
							className={cn(
								'h-10 hover:bg-white border border-transparent',
								currentPage === number && 'bg-white border-input'
							)}
						>
							{number}
						</Button>
					</li>
				))}
			</ul>

			<Button
				variant='ghost'
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={cn(
					'text-slate-900 h-10 hover:bg-white py-0',
					currentPage === totalPages ? '#f0f0f0' : '#fff'
				)}
			>
				Next
				<ChevronRight size={16} />
			</Button>
		</div>
	)
}
