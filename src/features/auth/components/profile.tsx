'use client'

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { useProfile } from '../api/use-profile'
import Link from 'next/link'
import { buttonVariants } from '@/shared/components/ui/button'

export default function Profile() {
	const { data } = useProfile()
	return (
		<div className='flex flex-col items-center justify-center'>
			<p className='text-slate-900 font-semibold mb-9 text-xl'>User Profile</p>
			<Avatar className='w-16 h-16 rounded-full bg-blue-200 text-blue-900 text-2xl uppercase font-semibold'>
				<AvatarFallback>{data?.username.at(1)}</AvatarFallback>
			</Avatar>
			<div className='space-y-3 mt-6 w-[336px] max-w-full'>
				<div className='grid grid-cols-[96px_1fr] bg-gray-100 px-3 py-2.5 rounded border border-slate-200'>
					<div className='flex justify-between items-center'>
						<p className='text-slate-900 font-semibold'>Nama</p>
						<p className='text-slate-900 font-semibold'>:</p>
					</div>
					<p className='text-slate-900 font-semibold text-center'>
						{data?.username}
					</p>
				</div>
				<div className='grid grid-cols-[96px_1fr] bg-gray-100 px-3 py-2.5 rounded border border-slate-200'>
					<div className='flex justify-between items-center'>
						<p className='text-slate-900 font-semibold'>Password</p>
						<p className='text-slate-900 font-semibold'>:</p>
					</div>
					<p className='text-slate-900 font-semibold text-center'>-</p>
				</div>
				<div className='grid grid-cols-[96px_1fr] bg-gray-100 px-3 py-2.5 rounded border border-slate-200'>
					<div className='flex justify-between items-center'>
						<p className='text-slate-900 font-semibold'>Role</p>
						<p className='text-slate-900 font-semibold'>:</p>
					</div>
					<p className='text-slate-900 font-semibold text-center'>
						{data?.role}
					</p>
				</div>
			</div>
			<Link
				href={'/articles'}
				className={buttonVariants({
					variant: 'default',
					className: 'h-10 w-full mt-9',
				})}
			>
				Back to home
			</Link>
		</div>
	)
}
