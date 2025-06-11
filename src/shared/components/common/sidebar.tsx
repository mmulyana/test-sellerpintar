'use client'

import { LogOut, Newspaper, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { authToken } from '@/shared/constant'
import { Button } from '../ui/button'
import { cn } from '@/shared/utils'

export default function Sidebar() {
	const router = useRouter()
	const pathname = usePathname()

	const onLogout = () => {
		Cookies.remove(authToken)
		router.replace('/login')
	}

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
		<div className='bg-blue-600 min-h-screen w-[267px] pt-6'>
			<div className='px-4'>
				<Link href={'/articles'}>
					<Image
						src='/assets/logo-white.svg'
						width={134}
						height={24}
						alt='logo'
						className='mb-6'
					/>
				</Link>
				<div className='space-y-2'>
					{menuItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={cn(
								'flex gap-3 px-4 py-2 text-white rounded-md hover:bg-blue-500 text-sm',
								isActive(item.path) && 'bg-blue-500'
							)}
						>
							{item.icon}
							<p>{item.name}</p>
						</Link>
					))}

					<button
						onClick={onLogout}
						className='flex gap-3 !px-4 py-2 w-full justify-start hover:bg-blue-500 text-white text-sm'
					>
						<LogOut size={20} />
						<p>Logout</p>
					</button>
				</div>
			</div>
		</div>
	)
}
