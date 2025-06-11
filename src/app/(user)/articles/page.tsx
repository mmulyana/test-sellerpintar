import { Suspense } from 'react'
import ArticleWrapper from './articles-wrapper'

export default function Page() {
	return (
		<div>
			<Suspense>
				<ArticleWrapper />
			</Suspense>
		</div>
	)
}
