'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { useCategories } from '../api/use-categories'
import { parseAsString, useQueryStates } from 'nuqs'

export default function CategorySelect() {
	const [query, setQuery] = useQueryStates({
		category: parseAsString,
	})

	const { data } = useCategories({ limit: 100 })

	return (
		<Select
			onValueChange={(val) => setQuery({ category: val })}
			value={query.category || ''}
			defaultValue={query.category || ''}
		>
			<SelectTrigger className='!h-10 w-full rounded-[6px] bg-white md:w-[180px] text-foreground border border-b shadow-none'>
				<SelectValue placeholder='Select category' />
			</SelectTrigger>
			<SelectContent>
				{data?.data
					?.filter((i) => i.id)
					.map((i) => (
						<SelectItem key={i.id} value={i.id}>
							{i.name}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	)
}
