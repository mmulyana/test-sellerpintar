import Sidebar from '@/shared/components/common/sidebar'

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-full w-full flex'>
			<Sidebar />
			<div className='w-full h-full bg-white'>{children}</div>
		</div>
	)
}
