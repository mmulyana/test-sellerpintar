import { ReactNode, useState } from 'react'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'
import { cn } from '@/shared/utils'

type AlertConfirmProps = {
	triggerLabel: string
	description?: string
	title?: string
	onConfirm: () => void
	triggerClassName?: string
	children?: ReactNode
}

export default function AlertConfirm({
	triggerLabel,
	description = 'Tindakan ini tidak dapat dibatalkan.',
	title = 'Yakin ingin melanjutkan tindakan ini?',
	onConfirm,
	triggerClassName,
	children,
}: AlertConfirmProps) {
	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant='link'
					className={cn(
						'text-red-500 hover:text-red-600 px-0',
						triggerClassName
					)}
					type='button'
				>
					{triggerLabel}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
					{children}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: 'destructive' })}
						onClick={() => {
							onConfirm()
							setOpen(false)
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
