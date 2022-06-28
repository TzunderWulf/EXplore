import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Map } from "../screens/Map";
import { List } from "../screens/List";
import { NotesStack } from "./NotesStackNavigation";
import { SettingsStack } from "./SettingsStackNavigation";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='List'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0f0f11",
                },
                tabBarActiveTintColor: "#AC371D",
                tabBarInactiveTintColor: "#808080",
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