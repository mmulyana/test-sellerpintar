import { Image, ImagePlus } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

interface ImageUploadProps {
	value?: File | string | null
	onChange: (file: File | null) => void
	maxSizeMb?: number
	className?: string
	invalid?: boolean
}

export const ImageUpload = ({
	value,
	onChange,
	maxSizeMb = 5,
	className,
	invalid,
}: ImageUploadProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (file.size / 1024 / 1024 > maxSizeMb) {
				alert(`Ukuran maksimal ${maxSizeMb}MB`)
				return
			}
			onChange(file)
		}
	}

	const preview =
		value instanceof File
			? URL.createObjectURL(value)
			: typeof value === 'string'
			? value
			: null

	return (
		<div className='flex items-center gap-4'>
			<div
				className={cn(
					'w-[223px] h-[163px] rounded-lg border border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-white relative',
					value && 'p-3 border-double border-border flex-col',
					invalid && 'border-red-600',
					className
				)}
			>
				{preview ? (
					<>
						<img
							src={preview}
							alt='Preview'
							className='object-cover w-full h-[115px] rounded'
						/>
						<div className='flex justify-center gap-2.5 mt-1'>
							<Button
								type='button'
								onClick={() => inputRef.current?.click()}
								variant='ghost'
								className='underline text-blue-500 hover:text-blue-600 h-fit p-0 hover:bg-transparent'
							>
								Changes
							</Button>
							<Button
								type='button'
								onClick={() => onChange(null)}
								variant='ghost'
								className='underline text-red-500 hover:text-red-600 h-fit p-0 hover:bg-transparent'
							>
								Delete
							</Button>
						</div>
					</>
				) : (
					<div
						className='flex justify-center items-center flex-col'
						onClick={() => inputRef.current?.click()}
					>
						<ImagePlus className='text-ink-light' size={28} />
						<Button
							type='button'
							variant='ghost'
							className='underline mt-3 text-xs h-fit hover:bg-transparent py-0 text-slate-500 mb-1'
						>
							Click to select files
						</Button>
						<p className='text-xs text-slate-500'>
							Support File Type: jpg or png
						</p>
					</div>
				)}
			</div>

			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={handleChange}
				className='hidden'
			/>
		</div>
	)
}
