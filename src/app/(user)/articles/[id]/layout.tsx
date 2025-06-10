import Header from '@/shared/components/common/header'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-full pt-24'>
			<Header mode='light' />
			{children}
		</div>
	)
}
