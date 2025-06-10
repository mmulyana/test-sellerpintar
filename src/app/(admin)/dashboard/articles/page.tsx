import TableArticles from '@/features/article/components/table-article'
import HeaderV2 from '@/shared/components/common/header-v2'

export default function Page() {
	return (
		<div>
			<HeaderV2 title='Articles' />
			<div className='p-6'>
				<TableArticles />
			</div>
		</div>
	)
}
