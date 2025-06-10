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
import Link from 'next/link'
import useScroll from '@/shared/hooks/use-scroll'
import { authToken } from '@/shared/constant'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Header({
	mode = 'default',
}: {
	mode?: 'default' | 'light'
}) {
	const isScroll = useScroll()
	const isMobile = useIsMobile()

	return (
		<div
			className={cn(
				'fixed top-0 h-16 md:h-24 left-0 w-full px-[21px] md:px-[60px] py-5 flex justify-between items-center z-10 transition-colors duration-150',
				(isMobile || mode === 'light' || isScroll) && 'bg-white border-b'
			)}
		>
			{isMobile || mode === 'light' || isScroll ? (
				<Link href='/articles'>
					<Image src='/assets/logo.svg' alt='Logo' width={134} height={24} />
				</Link>
			) : (
				<Image
					src='/assets/logo-white.svg'
					alt='Logo'
					width={134}
					height={24}
				/>
			)}
			<UserButton isMobile={isMobile} mode={mode} isScroll={isScroll} />
		</div>
	)
}

function UserButton({
	isMobile,
	mode,
	isScroll,
}: {
	isMobile?: boolean
	mode?: 'default' | 'light'
	isScroll: boolean
}) {
	const { data } = useProfile()
	const router = useRouter()

	const onLogout = () => {
		Cookies.remove(authToken)
		router.replace('/login')
	}

	const isAdmin = data?.role === 'Admin'

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
								mode === 'default' ? 'text-white ' : 'text-slate-900',
								isScroll && 'text-slate-900'
							)}
						>
							{data?.username}
						</p>
					)}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[224px] p-0'>
				<DropdownMenuItem
					className='py-[11px] px-[13px2]'
					onClick={() => router.push('/profile')}
				>
					My Account
				</DropdownMenuItem>
				<Separator />
				{isAdmin && (
					<>
						<DropdownMenuItem
							className='py-[11px] px-[13px]'
							onClick={() => router.push('/dashboard')}
						>
							Open Dashboard
						</DropdownMenuItem>
						<Separator />
					</>
				)}
				<DropdownMenuItem
					className='text-red-600 py-[11px] px-[13px]'
					onClick={onLogout}
				>
					<LogOut className='text-red-600' />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
