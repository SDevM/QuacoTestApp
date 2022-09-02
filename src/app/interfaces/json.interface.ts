/**
 * Represents a category
 * @typeParam T - The intended type of data to recieved from the api
 */
export interface JSONResponse<T> {
	status: number
	message: string
	data?: T
	error?: any
}
