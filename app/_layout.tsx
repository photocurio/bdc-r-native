import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { SourceSerif4_400Regular, SourceSerif4_700Bold } from '@expo-google-fonts/source-serif-4'
import * as SplashScreen from 'expo-splash-screen'
import { theme } from './styles/theme'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		'RobotoCondensed-Bold': RobotoCondensed_700Bold,
		'SourceSerif-Regular': SourceSerif4_400Regular,
		'SourceSerif-Bold': SourceSerif4_700Bold,
	})

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) return null

	return (
		<>
			<StatusBar style="dark" />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTintColor: theme.colors.primary,
					headerTitleStyle: {
						fontFamily: 'RobotoCondensed-Bold',
					},
					headerLargeTitleStyle: {
						fontFamily: 'RobotoCondensed-Bold',
						fontSize: theme.typography.fontSize.xxl,
					}
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'Boston.com',
						headerLargeTitle: true,
					}}
				/>
			</Stack>
		</>
	)
}

