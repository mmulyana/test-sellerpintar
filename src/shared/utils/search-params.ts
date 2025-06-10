import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'

export const pagintionSearchParams = {
	search: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(pagintionSearchParams)
