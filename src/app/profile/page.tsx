import Profile from '@/features/auth/components/profile'
import Footer from '@/shared/components/common/footer'
import Header from '@/shared/components/common/header'

export default function Page() {
	return (
		<>
			<Header mode='light' />
			<div className='min-h-screen pt-24 bg-white w-full flex justify-center items-center border'>
				<Profile />
			</div>
			<Footer />
		</>
	)
}
