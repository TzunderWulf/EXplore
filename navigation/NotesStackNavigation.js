import { createStackNavigator } from "@react-navigation/stack";

import { Notes } from "../screens/Notes";
import { AddNote } from "../screens/crud-notes/AddNote";
import { Note } from "../screens/crud-notes/Note";
import { EditNote } from "../screens/crud-notes/EditNote";
import { useTheme } from "../themes/themesProvider";

const Stack = createStackNavigator();

export const NotesStack = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.navigation.backgroundColor,
                },
                headerTintColor: theme.textColor
            }}>
            <Stack.Screen
                name="Notes"
                component={Notes}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Add note"
                component={AddNote} />
            <Stack.Screen
                name="View note"
                component={Note} />
            <Stack.Screen
                name="Edit note"
                component={EditNote} />
        </Stack.Navigator>
    )
}