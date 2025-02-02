export interface WPPage {
	id: number
	date: string
	modified: string
	slug: string
	status: string
	type: string
	title: {
		rendered: string
	}
	content: {
		rendered: string
		protected: boolean
	}
	featured_media: number
	template: string
	yoast_head_json?: {
		title: string
		description: string
		og_image?: {
			url: string
			width: number
			height: number
		}[]
	}
}

export type APIResponse<T> = {
	data: T | null
	error: string | null
	isLoading: boolean
}
