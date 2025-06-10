import Header from '@/shared/components/common/header'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-full'>
			<Header />
			{children}
		</div>
	)
}
