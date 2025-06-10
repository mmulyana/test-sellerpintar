import Sidebar from '@/shared/components/common/sidebar'

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-screen w-full flex'>
			<Sidebar />
			<div className='w-full h-full'>{children}</div>
		</div>
	)
}
