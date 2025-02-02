import { useEffect, useState } from 'react'
import {
	StyleSheet,
	ScrollView,
	RefreshControl,
	View,
	Text,
	useWindowDimensions
} from 'react-native'
import RenderHtml from 'react-native-render-html'
import { fetchHomepage } from './api/homepage'
import type { WPPage, APIResponse } from './api/types'
import { theme } from './styles/theme'

export default function Home() {
	const { width } = useWindowDimensions()
	const [state, setState] = useState<APIResponse<WPPage>>({
		data: null,
		error: null,
		isLoading: true
	})

	const loadData = async () => {
		setState(prev => ({ ...prev, isLoading: true }))
		const result = await fetchHomepage()
		setState(result)
	}

	const onRefresh = () => {
		loadData()
	}

	useEffect(() => {
		loadData()
	}, [])

	if (state.isLoading) {
		return (
			<View style={styles.center}>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (state.error) {
		return (
			<View style={styles.center}>
				<Text style={styles.error}>{state.error}</Text>
			</View>
		)
	}

	const onHTMLLoaded = (html: string) => {
		console.log('Rendered elements:', html)
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />
			}
		>
			{state.data ? (
				<View style={styles.content}>
					<Text style={styles.title}>{state.data.title?.rendered}</Text>
					<RenderHtml
						contentWidth={width}
						debug={true}
						onHTMLLoaded={onHTMLLoaded}
						enableExperimentalBRCollapsing={true}
						source={{ html: state.data.content?.rendered || '' }}
						classesStyles={classesStyles}
						tagsStyles={tagsStyles}
					/>
				</View>
			) : null}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	content: {
		padding: theme.layout.containerPadding,
		maxWidth: theme.layout.maxWidth,
		alignSelf: 'center',
		width: '100%',
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.md,
	},
	error: {
		padding: theme.spacing.md,
		color: theme.colors.secondary,
	},
})

// Update your RenderHtml tagsStyles to use the theme
const tagsStyles = {
	body: {
		color: theme.colors.text.primary,
	},
	p: {
		fontSize: theme.typography.fontSize.md,
		lineHeight: theme.typography.fontSize.md * 1.5,
		marginBottom: theme.spacing.md,
	},
	a: {
		color: theme.colors.primary,
	}
}

const classesStyles = {
	'a-article__wrapper': {
		display: 'flex' as const,
		flexDirection: 'row' as const,
		alignItems: 'start' as const,
	},
	'a-article--card-featured a-article__wrapper': {
		flexDirection: 'column' as const,
	},
	'a-article__image': {
		marginLeft: 0,
	},
	'another-class': {
		backgroundColor: '#f0f0f0',
	}
}
