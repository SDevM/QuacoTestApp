/**
 * Represents a charter model instance
 */
export interface Charter {
	_id: string
	_user: string
	_driver: string
	language?: string
	music?: string
	leave: string
	arrive: string
	appointment: Date
	expect: Date
	price: number
	timestamp: Date
	looking: boolean
}
