import { Charter } from './charters.interface'

/**
 * Represents a charter model instance
 */
export interface Report {
	_id: string
	charter: string | Charter
	type: string
	filer: string
	report: {
		title: String
		complainant: string
		body: String
		attachments: File[]
	}
	open: boolean
}
