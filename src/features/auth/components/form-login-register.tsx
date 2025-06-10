'use client'

import { Card } from '@/shared/components/ui/card'
import Image from 'next/image'
import { AuthForm } from '../types'
import { useForm } from 'react-hook-form'
import { useLogin } from '../api/use-login'
import { useRegister } from '../api/use-register'
import {
	Form,
	FormControl,
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
import { Button } from '@/shared/components/ui/button'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FormLoginRegister({
	variant,
}: {
	variant: 'login' | 'register'
}) {
	const router = useRouter()
	const { mutate: login, isPending: isPendingLogin } = useLogin()
	const { mutate: register, isPending: isPendingRegis } = useRegister()

	const form = useForm<AuthForm>({
		defaultValues: {
			password: '',
			role: '',
			username: '',
		},
	})

	const onSubmit = (payload: AuthForm) => {
		if (variant === 'register') {
			register(payload, {
				onSuccess: () => {
					router.push('/login')
				},
			})
			return
		}

		login(
			{
				password: payload.password,
				username: payload.username,
			},
			{
				onSuccess: (data) => {
					const path = data.data.role === 'Admin' ? '/dashboard' : '/articles'
					router.push(path)
				},
			}
		)
	}

	const links = {
		login: (
			<p className='text-slate-600 text-sm text-center'>
				Don&apos;t an account?{' '}
				<Link className='text-blue-600 underline' href={'/register'}>
					Register
				</Link>
			</p>
		),
		register: (
			<p className='text-slate-600 text-sm text-center'>
				Already have an account?{' '}
				<Link className='text-blue-600 underline' href={'/login'}>
					Login
				</Link>
			</p>
		),
	}

	return (
		<Card className='px-4 py-10'>
			<Image
				src='/assets/logo.png'
				alt='Logo'
				width={134}
				height={24}
				priority
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{variant === 'register' && (
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select Role' />
											</SelectTrigger>
											<SelectContent>
												{['User', 'Admin'].map((i) => (
													<SelectItem value={i} key={i}>
														{i}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<ButtonSubmit
						variant={variant}
						isPending={isPendingLogin || isPendingRegis}
					/>
				</form>
			</Form>
			{links[variant]}
		</Card>
	)
}

function ButtonSubmit({
	variant,
	isPending,
}: {
	variant: 'login' | 'register'
	isPending?: boolean
}) {
	return (
		<Button disabled={isPending} className='w-full mt-3'>
			{isPending && <Loader className='mr-2 h-4 w-4 animate-spin' />}{' '}
			{isPending ? 'Loading...' : variant == 'login' ? 'Login' : 'Register'}
		</Button>
	)
}
