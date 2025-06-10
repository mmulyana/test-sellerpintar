'use client'

import Image from 'next/image'
import Link from 'next/link'

import useScroll from '@/shared/hooks/use-scroll'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/utils'
import UserMenu from '@/features/auth/components/user-menu'

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
			<UserMenu mode={mode} />
		</div>
	)
}
