import { Toaster } from 'sonner'

export default function ToasterWrapper({ children }: React.PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster
				richColors
				theme='light'
				position='top-right'
				duration={1500}
			/>
		</>
	)
}
