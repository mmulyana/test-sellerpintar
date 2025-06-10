'use client'

import { useIsMobile } from '@/shared/hooks/use-mobile'
import Image from 'next/image'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useProfile } from '@/features/auth/api/use-profile'
import { cn } from '@/shared/lib/utils'
import { Separator } from '../ui/separator'
import { LogOut } from 'lucide-react'

export default function Header({
	mode = 'default',
}: {
	mode?: 'default' | 'light'
}) {
	const isMobile = useIsMobile()

	return (
		<div
			className={cn(
				'fixed top-0 left-0 w-full px-[21px] md:px-[60px] py-5 md:py-9 flex justify-between items-center z-10',
				isMobile && 'bg-white'
			)}
		>
			{!isMobile ? (
				<Image
					src='/assets/logo-white.png'
					alt='Logo'
					width={134}
					height={24}
					priority
				/>
			) : (
				<Image
					src='/assets/logo.png'
					alt='Logo'
					width={134}
					height={24}
					priority
				/>
			)}
			<UserButton isMobile={isMobile} mode={mode} />
		</div>
	)
}

function UserButton({
	isMobile,
	mode,
}: {
	isMobile?: boolean
	mode?: 'default' | 'light'
}) {
	const { data } = useProfile()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex justify-end gap-1.5 items-center'>
					<Avatar className='bg-blue-200 uppercase text-blue-900 h-8 w-8'>
						<AvatarFallback>{data?.username.at(1)}</AvatarFallback>
					</Avatar>
					{!isMobile && (
						<p
							className={cn(
								'underline text-base font-medium',
								mode === 'default' ? 'text-white ' : 'text-slate-900'
							)}
						>
							{data?.username}
						</p>
					)}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>My Account</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem className='text-red-600'>
					<LogOut />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
