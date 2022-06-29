import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import i18n from "i18n-js";

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { CustomText } from "../custom-components/CustomText";
import { useTheme } from "../themes/themesProvider";

const db = SQLite.openDatabase("db.testDb")

export const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const { theme } = useTheme();
    const isFocused = useIsFocused(); // Used to rerender page when in focus

    const t = (key) => { return i18n.t(key) }

    /**
     * Get all items from the database. Function runs only when the screen 
     * gets focused on, not when user moves away.
     */
    const getItems = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM items", null, (_, { rows: { _array } }) => setNotes(_array))
        });
    }

    /**
     * Delete a specific item from the database.
     * 
     * @param id
     */
    const removeItem = (id) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM items WHERE id = ?", [id]);
            getItems();
        });
    }

    /**
    * Function to render an item of the flatlist.
    *
    * @param item
    */
    const renderItem = ({ item }) => {
        return (
            <View style={styles.note}>
                <Heading
                    shownText={item.title}
                    size={30} />
                <CustomButton
                    buttonText={t("notes.view-button")}
                    icon="md-reader"
                    onPress={() => navigation.navigate("View note", { id: item.id })} />
                <CustomButton
                    buttonText={t("notes.edit-button")}
                    icon="md-pencil"
                    onPress={() => navigation.navigate("Edit note", { id: item.id, title: item.title, text: item.text })} />
                <CustomButton
                    buttonText={t("notes.delete-button")}
                    icon="md-trash-bin"
                    onPress={() => removeItem(item.id)} />
            </View>
        );
    }

    useEffect(() => {
        if (isFocused == true) {
            getItems();
        }
    }, [isFocused])

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText={t("notes.heading")}
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <CustomButton
                buttonText={t("notes.create-button")}
                icon="md-add-circle"
                onPress={() => navigation.navigate("Add note")} />
            {notes.length == 0 ? <CustomText shownText={t("notes.no-notes")} customStyle={styles.text} /> : (
                <FlatList
                    data={notes}
                    renderItem={renderItem} />
            )}
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
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        paddingVertical: 30,
    },
    note: {
        paddingVertical: 20,
        borderBottomColor: "#18191b",
        borderBottomWidth: 4,
    }
});