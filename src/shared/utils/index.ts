import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date: string) => {
	if (date === '') return ''
	const parseDate = new Date(date)
	return format(parseDate, 'dd MMMM, yyyy', { locale: id })
}
