'use client'

import { LogOut, Newspaper, Tag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { authToken } from '@/shared/constant'
import { Button } from '../ui/button'
import { cn } from '@/shared/utils'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { useEffect } from 'react'

export default function Sidebar() {
	const [open, setOpen] = useQueryState(
		'sidebar',
		parseAsBoolean.withDefault(false)
	)
	const isMobile = useIsMobile()
	const pathname = usePathname()
	const router = useRouter()

	const onLogout = () => {
		Cookies.remove(authToken)
		router.replace('/login')
	}

	useEffect(() => {
		if (isMobile) {
			setOpen(false)
		}
	}, [isMobile, setOpen])

	const menuItems = [
		{
			name: 'Articles',
			path: '/dashboard/articles',
			icon: <Newspaper size={20} />,
		},
		{
			name: 'Category',
			path: '/dashboard/categories',
			icon: <Tag size={20} />,
		},
	]

	const isActive = (path: string) => pathname === path

	return (
		<div
			className={cn(
				'bg-blue-600 min-h-screen absolute md:relative hidden z-10 w-full md:w-[267px] pt-6',
				isMobile ? (!open ? 'hidden' : 'block') : 'md:block'
			)}
		>
			<div className='px-4'>
				<div className='flex justify-between items-center mb-6'>
					<Link href={'/articles'}>
						<Image
							src='/assets/logo-white.svg'
							width={134}
							height={24}
							alt='logo'
						/>
					</Link>
					{isMobile && open && (
						<Button onClick={() => setOpen(false)} className='bg-blue-500 p-0'>
							<X />
						</Button>
					)}
				</div>
				<div className='space-y-2'>
					{menuItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={cn(
								'flex gap-3 px-4 py-2 text-white rounded-md hover:bg-blue-500 text-sm',
								isActive(item.path) && 'bg-blue-500'
							)}
							onClick={() => {
								if (isMobile) {
									setOpen(false)
								}
							}}
						>
							{item.icon}
							<p>{item.name}</p>
						</Link>
					))}

					<button
						onClick={onLogout}
						className='flex gap-3 !px-4 py-2 w-full justify-start hover:bg-blue-500 text-white text-sm rounded-md cursor-pointer'
					>
						<LogOut size={20} />
						<p>Logout</p>
					</button>
				</div>
			</div>
		</div>
	)
}
