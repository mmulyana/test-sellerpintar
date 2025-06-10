import Footer from '@/shared/components/common/footer'
import Header from '@/shared/components/common/header'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<>
			<div className='min-h-screen pb-[100px] bg-white'>{children}</div>
			<Footer />
		</>
	)
}
