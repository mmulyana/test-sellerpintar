import AlertConfirm from '@/shared/components/common/alert-confirm'
import { useDeleteCategory } from '../api/use-delete-category'

export default function DestoryCategoryConfirm({
	id,
	name,
}: {
	id: string
	name: string
}) {
	const { mutate } = useDeleteCategory()

	if (!id) return null

	return (
		<AlertConfirm
			onConfirm={() => {
				mutate({ id })
			}}
			triggerLabel='Delete'
			title='Delete Category'
			description={`Delete category '${name}'? This will remove it from master data permanently.`}
			triggerClassName='underline text-red-500'
		/>
	)
}
