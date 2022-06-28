import { createStackNavigator } from "@react-navigation/stack";

import { Settings } from "../screens/Settings";
import { LanguageSelection } from "../screens/settings-options/LanguageSelection";
import { useTheme } from '../themes/themesProvider';

const Stack = createStackNavigator();

export const SettingsStack = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.navigation.backgroundColor,
                },
                headerTintColor: theme.textColor,
                headerTitleStyle: {
                    fontFamily: "Ubuntu_500Medium"
                }
            }}>
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Language Selection"
                component={LanguageSelection} />
        </Stack.Navigator>
    )
}