'use client'

import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { Search as SearchIcon } from 'lucide-react'
import { cn } from '@/shared/utils'
import { Input } from '../ui/input'

type Props = {
	placeholder?: string
	className?: string
	value?: string
	onValueChange?: (value: string) => void
}

export default function Search({
	placeholder,
	className,
	value,
	onValueChange,
}: Props) {
	const isControlled =
		typeof onValueChange === 'function' && typeof value === 'string'

	const [query, setQuery] = useQueryState(
		'search',
		parseAsString.withDefault('')
	)
	const [inputValue, setInputValue] = useState(value ?? query)

	useEffect(() => {
		const handler = setTimeout(() => {
			if (isControlled) {
				onValueChange?.(inputValue)
			} else {
				setQuery(inputValue)
			}
		}, 500)

		return () => {
			clearTimeout(handler)
		}
	}, [inputValue, isControlled, onValueChange, setQuery])

	return (
		<div className='relative h-9 w-fit bg-white'>
			<SearchIcon
				size={20}
				className='top-1/2 -translate-y-1/2 left-3 absolute text-slate-400'
			/>
			<Input
				type='text'
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value)
				}}
				placeholder={placeholder || 'Search by title'}
				className={cn(
					'h-9 pr-2 pb-0.5 pl-9 max-w-[240px] w-full border border-slate-300 shadow-none rounded-md text-slate-400',
					className
				)}
			/>
		</div>
	)
}
