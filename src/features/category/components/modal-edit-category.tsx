import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import FormCategory from './form-category'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { usePutCategory } from '../api/use-put-category'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryMutate } from '../types'
import { CategorySchema } from '../schema'

export default function ModalEditCategory({
	id,
	name,
}: {
	id: string
	name: string
}) {
	const [open, setOpen] = useState(false)
	const form = useForm<CategoryMutate>({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			name: '',
		},
	})

	const { mutate } = usePutCategory()

	const onSubmit = (data: any) => {
		mutate(
			{ id, name: data.name },
			{
				onSuccess: () => {
					setOpen(false)
					form.reset({ name: '' })
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{id && (
				<DialogTrigger asChild>
					<Button
						variant='link'
						className='underline text-blue-600 h-fit p-0 w-fit'
					>
						Edit
					</Button>
				</DialogTrigger>
			)}
			<DialogContent className='p-0'>
				<DialogHeader className='pt-6 px-6'>
					<DialogTitle>Add Category</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<FormCategory form={form} onSubmit={onSubmit} />
				<DialogFooter className='pb-6 px-6'>
					<DialogClose className={buttonVariants({ variant: 'outline' })}>
						Cancel
					</DialogClose>
					<Button onClick={() => form.handleSubmit(onSubmit)()}>Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
