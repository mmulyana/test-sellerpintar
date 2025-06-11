import HeaderV2 from '@/shared/components/common/header-v2'
import Profile from '@/features/auth/components/profile'

export default function Page() {
	return (
		<div>
			<HeaderV2 title='User Profile' />
			<div className='p-6'>
				<div className='flex justify-center items-center w-full h-full py-20 bg-white'>
					<Profile />
				</div>
			</div>
		</div>
	)
}
