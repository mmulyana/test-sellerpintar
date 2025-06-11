import TableCategory from '@/features/category/components/table-category'
import HeaderV2 from '@/shared/components/common/header-v2'

export default function Page() {
	return (
		<div>
			<HeaderV2 title='Category' />
			<div className='p-6'>
				<TableCategory />
			</div>
		</div>
	)
}
