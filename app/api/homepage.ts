import { WPPage } from './types'

const BASE_URL = 'https://www.boston.com/wp-json/wp/v2'

export async function fetchHomepage(): Promise<APIResponse<WPPage>> {
	try {
		const response = await fetch(`${BASE_URL}/pages/7`)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data = await response.json()
		return {
			data,
			error: null,
			isLoading: false
		}
	} catch (error) {
		return {
			data: null,
			error: error instanceof Error ? error.message : 'An unknown error occurred',
			isLoading: false
		}
	}
}
