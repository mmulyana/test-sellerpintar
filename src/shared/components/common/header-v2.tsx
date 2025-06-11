'use client'

import UserMenu from '@/features/auth/components/user-menu'
import { Menu } from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { Button } from '../ui/button'

export default function HeaderV2({ title }: { title: string }) {
	const [open, setOpen] = useQueryState(
		'sidebar',
		parseAsBoolean.withDefault(false)
	)

	return (
		<div className='flex justify-between items-center bg-white h-[68px] px-6 border-b'>
			<div className='flex gap-2 items-center'>
				<Button variant='outline' onClick={() => setOpen(!open)} className='block md:hidden'>
					<Menu />
				</Button>
				<p className='text-xl font-semibold text-slate-900'>{title}</p>
			</div>
			<UserMenu variant='dashboard' />
		</div>
	)
}
