import { useCategories } from '@/features/category/api/use-categories'
import { ImageUpload } from '@/shared/components/common/image-upload'
import TextEditor from '@/shared/components/common/text-editor'
import { Button } from '@/shared/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

export default function FormArticle({
	form,
	onSubmit,
}: {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
}) {
	const { data } = useCategories({})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='imageUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thumbnails</FormLabel>
							<FormControl>
								<ImageUpload onChange={field.onChange} value={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} className='bg-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className='!h-10 w-full rounded-[6px] bg-white border-border shadow-none'>
										<SelectValue placeholder='Select category' />
									</SelectTrigger>
									<SelectContent>
										{data?.data
											?.filter((i) => i.id)
											.map((i) => (
												<SelectItem key={i.id} value={i.id}>
													{i.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>
								The existing category list can be seen in the{' '}
								<Link href='/dashboard/articles'>category</Link> menu
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<TextEditor
									onChange={field.onChange}
									defaultValue={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end gap-2'>
					<Button variant='outline' type='button'>
						Cancel
					</Button>
					<Button variant='secondary' type='button'>
						Preview
					</Button>
					<Button>Upload</Button>
				</div>
			</form>
		</Form>
	)
}
