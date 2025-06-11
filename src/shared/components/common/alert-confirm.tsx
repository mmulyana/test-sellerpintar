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
					variant='ghost'
					className={cn(
						'text-error hover:text-white hover:bg-error px-2.5',
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
