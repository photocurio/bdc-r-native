export const theme = {
	colors: {
		primary: '#bb2525',
		secondary: '#E81E25',
		background: '#FFFFFF',
		text: {
			primary: '#333333',
			secondary: '#666666',
			light: '#999999'
		},
		border: '#EEEEEE'
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32
	},
	typography: {
		fontFamily: {
			heading: 'RobotoCondensed-Bold',
			body: 'SourceSerif-Regular',
			bodyBold: 'SourceSerif-Bold'
		},
		fontSize: {
			xs: 12,
			sm: 14,
			md: 16,
			lg: 18,
			xl: 24,
			xxl: 32
		},
		fontWeight: {
			regular: '400' as const,  // Type assertions for font weights
			medium: '500' as const,
			bold: '700' as const
		}
	},
	layout: {
		containerPadding: 16,
		maxWidth: 640
	}
}


// Type definitions for our theme
export type Theme = typeof theme
