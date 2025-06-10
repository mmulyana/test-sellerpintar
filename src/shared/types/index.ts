export interface IApi<T = void> {
	data?: T
	total?: number
	page?: number
	limit?: number
}
