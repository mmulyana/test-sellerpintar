import Footer from '@/shared/components/common/footer'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<>
			<div className='min-h-screen pb-[100px] bg-white'>{children}</div>
			<Footer />
		</>
	)
}
