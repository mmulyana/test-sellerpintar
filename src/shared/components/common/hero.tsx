import { SelectValue } from '@radix-ui/react-select'
import { Input } from '../ui/input'
import { Select, SelectTrigger } from '../ui/select'
import { Search } from 'lucide-react'

export default function Hero() {
	return (
		<div className='w-full h-fit md:h-[400px] md:pb-[80px] pb-16 relative bg-red-400 flex items-end'>
			<div className='flex flex-col items-center mx-auto relative z-[2] text-white w-[730px] max-w-full'>
				<p className='text-base font-bold mb-3'>Blog genzet</p>
				<p className='text-5xl font-medium mb-3'>
					The Journal : Design Resources, Interviews, and Industry News
				</p>
				<p className='text-2xl mb-10'>Your daily dose of design insights</p>
				<div className='p-2.5 rounded-md bg-blue-500 flex gap-2 flex-col md:flex-row  max-w-full w-[608px]'>
					<Select>
						<SelectTrigger className='w-full !h-10 md:w-[180px] bg-white rounded-[6px]'>
							<SelectValue placeholder='Select category' />
						</SelectTrigger>
					</Select>
					<div className='relative w-full'>
						<Search
							size={16}
							className='text-slate-400 absolute top-1/2 left-3 -translate-y-1/2'
						/>
						<Input className='w-full h-10 bg-gray-50 text-foreground pl-[34px] rounded-[6px]' />
					</div>
				</div>
			</div>
			<img
				src='/assets/background.jpg'
				className='absolute top-0 left-0 h-full w-full object-cover'
				alt='background'
			/>
			<div className='absolute top-0 left-0 bg-blue-600/80 z-[1] w-full h-full'></div>
		</div>
	)
}
