import React from "react";
import { StyleSheet, Alert, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import i18n from "i18n-js";

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { useTheme } from "../themes/themesProvider";

const db = SQLite.openDatabase("db.testDb");

export const Settings = ({ navigation }) => {
    const { theme, updateTheme } = useTheme();
    const changeTheme = () => updateTheme(theme.themeMode);
    const isFocused = useIsFocused(); // Used to rerender the page

    const t = (key) => { return i18n.t(key) };

    /**
    * Removes all items from the datbase for user convenience.
    */
    const removeItems = () => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM items", null);
        });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <ScrollView>
                <Heading
                    shownText={t("settings.heading")}
                    customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                    size={50} />
                <View style={[styles.setting, { borderBottomColor: theme.textColor }]}>
                    <Heading
                        shownText={t("settings.option-themes")}
                        size={30} />
                    <CustomButton
                        buttonText={theme.themeMode !== "default" ? t("settings.change-dark-theme-button") : t("settings.change-light-theme-button")}
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: "10%",
        paddingHorizontal: 30,

        backgroundColor: "#fff",
    },
    screenHeading: {
        borderBottomWidth: 4,
    },
    setting: {
        width: "100%",

        borderBottomWidth: 4,

        paddingVertical: 10,
    },
});
