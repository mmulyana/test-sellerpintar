export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='flex justify-center items-center w-full min-h-screen'>
			<div className='max-w-full w-[400px]'>{children}</div>
		</div>
	)
}
