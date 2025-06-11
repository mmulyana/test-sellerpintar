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
import { Plus } from 'lucide-react'
import FormCategory from './form-category'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@radix-ui/react-dialog'
import { useCreateCategory } from '../api/use-create-category'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategorySchema } from '../schema'
import { CategoryMutate } from '../types'
export default function ModalAddCategory() {
	const [open, setOpen] = useState(false)
	const form = useForm<CategoryMutate>({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			name: '',
		},
	})

	const { mutate } = useCreateCategory()

	const onSubmit = (data: any) => {
		mutate(
			{ name: data.name },
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
			<DialogTrigger asChild>
				<Button>
					<Plus size={20} />
					Add Category
				</Button>
			</DialogTrigger>
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
