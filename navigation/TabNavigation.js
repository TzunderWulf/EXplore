import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Map } from "../screens/Map";
import { List } from "../screens/List";
import { NotesStack } from "./NotesStackNavigation";
import { SettingsStack } from "./SettingsStackNavigation";
import { useTheme } from "../themes/themesProvider";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="List"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.navigation.backgroundColor,
                },
                tabBarActiveTintColor: theme.navigation.active,
                tabBarInactiveTintColor: theme.navigation.inactive,
            }}>
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="md-map" size={size} color={color} />
                    )
                }} />
            <Tab.Screen
                name="List"
                component={List}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="md-list-circle" size={size} color={color} />
                    )
                }} />
            <Tab.Screen
                name="NotesStack"
                component={NotesStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="md-reader" size={size} color={color} />
                    )
                }} />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="md-settings" size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>
    )
}