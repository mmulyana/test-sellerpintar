import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date: string) => {
	if (date === '') return ''
	const parseDate = new Date(date)
	return format(parseDate, 'dd MMMM, yyyy', { locale: id })
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}