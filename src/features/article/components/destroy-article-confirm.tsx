import AlertConfirm from '@/shared/components/common/alert-confirm'
import { useDeleteArticle } from '../api/use-delete-article'

export default function DestoryArticleConfirm({ id }: { id: string }) {
	const { mutate } = useDeleteArticle()

	return (
		<AlertConfirm
			onConfirm={() => {
				mutate({ id })
			}}
			triggerLabel='Delete'
			title='Delete Articles'
			description='Deleting this article is permanent and cannot be undone. All related content will be removed.'
		/>
	)
}
