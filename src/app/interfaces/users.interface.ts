/**
 * Represents a user model instance
 */
export interface User {
	_id?: string
	title: string
	name: string
	surname: string
	username: string
	email: string
	password: string
	address: string
	profile_pic?: File
}
