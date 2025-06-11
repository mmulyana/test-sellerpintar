'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Cookies from 'js-cookie'

import useScroll from '@/shared/hooks/use-scroll'
import { useProfile } from '@/features/auth/api/use-profile'
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { Separator } from '@/shared/components/ui/separator'
import { authToken } from '@/shared/constant'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/utils'

export default function UserMenu({ mode }: { mode?: 'default' | 'light' }) {
	const isScroll = useScroll()

	const isMobile = useIsMobile()
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
					className='py-[11px] px-[13px]'
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
