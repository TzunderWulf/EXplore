import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import i18n from "i18n-js";

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { useTheme } from '../themes/themesProvider';

const db = SQLite.openDatabase('db.testDb')

export const Settings = ({ navigation }) => {
    const { theme, updateTheme } = useTheme();
    const changeTheme = () => updateTheme(theme.themeMode);
    const [value, setValue] = useState(0); // integer state
    const isFocused = useIsFocused();

    const t = (key) => { return i18n.t(key) };

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
                shownText={t("settings.heading")}
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText={t("settings.option-themes")}
                    size={30} />
                <CustomButton
                    buttonText={theme.themeMode !== 'default' ? t("settings.change-dark-theme-button") : t("settings.change-light-theme-button")}
                    onPress={changeTheme} />
            </View>
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText={t("settings.option-notes")}
                    size={30} />
                <CustomButton
                    buttonText={t("settings.remove-notes-button")}
                    onPress={() => {
                        removeItems();
                        Alert.alert("Removed all notes", "All notes have been removed.")
                    }} />
            </View>
            <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText={t("settings.option-languages")}
                    size={30} />
                <CustomButton
                    buttonText={t("settings.change-language-button")}
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
