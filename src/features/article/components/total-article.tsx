'use client'

import React from 'react'

export default function TotalArticle({
	page,
	limit,
	total,
}: {
	page: number
	limit: number
	total: number
}) {
	const startItem = (page - 1) * limit + 1
	const endItem = Math.min(page * limit, total)

	return (
		<div className='text-base text-slate-600 font-medium'>
			Showing : {startItem} - {endItem} of {total} articles
		</div>
	)
}
