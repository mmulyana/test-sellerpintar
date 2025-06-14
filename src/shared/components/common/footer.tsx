'use client'

import Image from 'next/image'

export default function Footer() {
	return (
		<div className='bg-blue-600 py-9 flex justify-center items-center gap-4 flex-col md:flex-row'>
			<Image src='/assets/logo-white.svg' width={134} height={24} alt='logo' />
			<p className='text-white'>
				© {new Date().getFullYear()} Blog genzet. All rights reserved.
			</p>
		</div>
	)
}
