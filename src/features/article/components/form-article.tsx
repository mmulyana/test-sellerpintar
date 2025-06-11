'use client'

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
import { cn } from '@/shared/utils'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'
import PreviewArticle from './preview-article'

export default function FormArticle({
	form,
	onSubmit,
}: {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
}) {
	const { data } = useCategories({})
	const content = form.watch('content')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='imageUrl'
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Thumbnails</FormLabel>
							<FormControl>
								<ImageUpload
									onChange={field.onChange}
									value={field.value}
									invalid={fieldState.error?.message?.includes('picture')}
								/>
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
					render={({ field, fieldState }) => (
						<FormItem className='w-full'>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger
										className={cn(
											'!h-10 w-full rounded-[6px] bg-white border-border shadow-none',
											fieldState.error && 'border-red-600'
										)}
									>
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
								<Link
									className='underline text-blue-600'
									href='/dashboard/categories'
								>
									category
								</Link>{' '}
								menu
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<TextEditor
									onChange={field.onChange}
									defaultValue={content}
									invalid={fieldState.error?.message?.includes('empty')}
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
					<PreviewArticle
						content={form.watch('content')}
						title={form.watch('title')}
					/>
					<Button>Upload</Button>
				</div>
			</form>
		</Form>
	)
}
