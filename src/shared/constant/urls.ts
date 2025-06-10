export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const api = baseUrl + '/api'

export const apiAuth = api + '/auth'
export const apiArticles = api + '/articles'
export const apiCategories = api + '/categories'
export const apiUpload = api + '/upload'
