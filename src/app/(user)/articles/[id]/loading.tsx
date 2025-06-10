import { Skeleton } from '@/shared/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='px-4 space-y-6 w-[1120px] max-w-full mx-auto pt-12'>
			<Skeleton className='h-10 w-full' />
			<Skeleton className='h-10 w-full' />
			<Skeleton className='h-10 w-full' />
		</div>
	)
}
