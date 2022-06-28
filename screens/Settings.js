import React from "react";
import { StyleSheet, Alert, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { useTheme } from '../themes/themesProvider';

const db = SQLite.openDatabase('db.testDb')

export const Settings = ({ navigation }) => {
    const { theme, updateTheme } = useTheme();
    const changeTheme = () => updateTheme(theme.themeMode);

    /**
     * Get all items from the database. Function runs only the screen gets
     * focused on, not when user move away.
     */
    const removeItems = () => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM items", null);
        });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText="Settings"
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText="Themes"
                    size={30} />
                <CustomButton
                    buttonText={theme.themeMode !== 'default' ? "Change to dark mode" : "Change to light mode"}
                    onPress={changeTheme} />
            </View>
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText="Notes"
                    size={30} />
                <CustomButton
                    buttonText="Remove all"
                    onPress={() => {
                        removeItems();
                        Alert.alert("Removed all notes", "All notes have been removed.")
                    }} />
            </View>
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText="Languages"
                    size={30} />
                <CustomButton
                    buttonText="Change language"
                    onPress={() => navigation.navigate("Language Selection")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    screenHeading: {
        borderBottomWidth: 4,
    },
    setting: {
        width: '100%',

        borderBottomWidth: 4,

        paddingVertical: 10,
    },
});
