import UserMenu from '@/features/auth/components/user-menu'

export default function HeaderV2({ title }: { title: string }) {
	return (
		<div className='flex justify-between items-center bg-white h-[68px] px-6 border-b'>
			<p className='text-xl font-semibold text-slate-900'>{title}</p>
			<UserMenu variant='dashboard' />
		</div>
	)
}
