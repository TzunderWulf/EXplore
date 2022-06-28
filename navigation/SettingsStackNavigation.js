import { createStackNavigator } from "@react-navigation/stack";

import { Settings } from "../screens/Settings";
import { LanguageSelection } from "../screens/settings-options/LanguageSelection";

const Stack = createStackNavigator();

export const SettingsStack = () => {
    return (
        <Stack.Navigator>
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