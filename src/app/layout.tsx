// app/layout.tsx
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import '../shared/styles/globals.css'
import QueryWrapper from '@/shared/lib/query-wrapper'
import ToasterWrapper from '@/shared/lib/toast-wrapper'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const archivoSans = Archivo({
	variable: '--font-archivo',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		default: 'Blog genzet',
		template: '%s | Blog genzet',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${archivoSans.variable} antialiased`}>
				<QueryWrapper>
					<ToasterWrapper>
						<NuqsAdapter>{children}</NuqsAdapter>
					</ToasterWrapper>
				</QueryWrapper>
			</body>
		</html>
	)
}
