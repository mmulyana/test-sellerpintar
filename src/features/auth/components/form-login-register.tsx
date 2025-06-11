'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Loader, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Card } from '@/shared/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

import { useRegister } from '../api/use-register'
import { useLogin } from '../api/use-login'
import { AuthForm } from '../types'
import { AuthSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/shared/utils'

export default function FormLoginRegister({
	variant,
}: {
	variant: 'login' | 'register'
}) {
	const router = useRouter()
	const { mutate: login, isPending: isPendingLogin } = useLogin()
	const { mutate: register, isPending: isPendingRegis } = useRegister()
	const [showPassword, setShowPassword] = useState(false)

	const schema =
		variant === 'login' ? AuthSchema.omit({ role: true }) : AuthSchema

	const form = useForm<AuthForm>({
		resolver: zodResolver(schema),
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
				src='/assets/logo.svg'
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
									<div className='relative'>
										<Input
											{...field}
											type={showPassword ? 'text' : 'password'}
										/>
										<button
											type='button'
											className='absolute inset-y-0 right-0 flex items-center pr-3'
											onClick={() => setShowPassword((prev) => !prev)}
										>
											{showPassword ? (
												<EyeOff className='h-4 w-4 text-slate-500' />
											) : (
												<Eye className='h-4 w-4 text-slate-500' />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{variant === 'register' && (
						<FormField
							control={form.control}
							name='role'
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={cn(
													'w-full',
													fieldState.error?.message?.includes('select') && 'border-red-600'
												)}
											>
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
