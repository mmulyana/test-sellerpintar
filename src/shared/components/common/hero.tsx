'use client'

import { useEffect, useState } from 'react'
import { SelectValue } from '@radix-ui/react-select'
import { Input } from '../ui/input'
import { Select, SelectTrigger } from '../ui/select'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'

export default function Hero() {
	const [querySearch, setQuerySearch] = useQueryState('search')
	const [search, setSearch] = useState(querySearch || '')

	useEffect(() => {
		const handler = setTimeout(() => {
			setQuerySearch(search)
		}, 800)

		return () => {
			clearTimeout(handler)
		}
	}, [search])

	return (
		<div className='relative flex h-fit w-full items-end bg-red-400 pb-16 md:h-[400px] md:pb-[80px]'>
			<div className='relative z-[2] mx-auto flex w-[730px] max-w-full flex-col items-center text-white'>
				<p className='mb-3 text-base font-bold'>Blog genzet</p>
				<p className='mb-3 text-5xl font-medium'>
					The Journal : Design Resources, Interviews, and Industry News
				</p>
				<p className='mb-10 text-2xl'>Your daily dose of design insights</p>
				<div className='flex w-[608px] max-w-full flex-col gap-2 rounded-md bg-blue-500 p-2.5 md:flex-row'>
					<Select>
						<SelectTrigger className='!h-10 w-full rounded-[6px] bg-white md:w-[180px]'>
							<SelectValue placeholder='Select category' />
						</SelectTrigger>
					</Select>
					<div className='relative w-full'>
						<Search
							size={16}
							className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
						/>
						<Input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search...'
							className='h-10 w-full rounded-[6px] bg-gray-50 pl-[34px] text-foreground'
						/>
					</div>
				</div>
			</div>
			<img
				src='/assets/background.jpg'
				className='absolute left-0 top-0 h-full w-full object-cover'
				alt='background'
			/>
			<div className='absolute left-0 top-0 z-[1] h-full w-full bg-blue-600/80'></div>
		</div>
	)
}
