import { LogOut, Newspaper, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
	return (
		<div className='bg-blue-600 min-h-screen w-[267px] pt-6'>
			<div className='px-4'>
				<Image
					src='/assets/logo-white.svg'
					width={134}
					height={24}
					alt='logo'
					className='mb-6'
				/>
				<div className='space-y-2'>
					<Link href={'/dashboard/articles'} className='flex gap-3 px-4 py-2'>
						<Newspaper />
						<p>Articles</p>
					</Link>
					<Link href={'/dashboard/articles'} className='flex gap-3 px-4 py-2'>
						<Tag />
						<p>Category</p>
					</Link>
					<Link href={'/dashboard/articles'} className='flex gap-3 px-4 py-2'>
						<LogOut />
						<p>Logout</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
