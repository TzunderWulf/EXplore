import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as SQLite from "expo-sqlite";
import i18n from "i18n-js";

const db = SQLite.openDatabase("db.testDb")

import { Heading } from "../../custom-components/Heading";
import { CustomButton } from "../../custom-components/CustomButton";
import { useTheme } from "../../themes/themesProvider";

export const EditNote = ({ route, navigation }) => {
    const [title, changeTitle] = useState();
    const [text, changeText] = useState();
    const [id, setId] = useState();
    const { theme } = useTheme();

    const t = (key) => { return i18n.t(key) }

    /**
    * Update specific note with the help of the id. Also makes sure that 
    * the inputs can't be empty.
    * 
    * @param id
    */
    const updateItem = (id) => {
        if (title == "" || text == "") {
            Alert.alert("Error", t("edit-note.error-empty"))
        } else {
            db.transaction(tx => {
                tx.executeSql("UPDATE items SET title = ?, text = ? where id = ?", [title, text, id])
            })
            console.log("changed")
            navigation.navigate("Notes");
        }
    }

    useEffect(() => {
        if (route.params != undefined) {
            let { id, title, text } = route.params;
            changeTitle(title);
            changeText(text);
            setId(id);
        } else {
            navigation.navigate("Notes")
        }

        navigation.setOptions({
            title: t("edit-note.header-title")
        })
    }, [])

    return (
        <KeyboardAvoidingView behavior="padding" style={[styles.noPadding, { backgroundColor: theme.backgroundColor }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                    <Heading
                        shownText={t("edit-note.heading")}
                        customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                        size={50} />
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
                        value={title}
                        onChangeText={changeTitle}
                        placeholderTextColor={theme.navigation.inactive}
                        placeholder={t("edit-note.title-input-placeholder")}
                    />
                    <TextInput
                        style={[styles.input, styles.inputMulti, { color: theme.textColor, borderColor: theme.textColor }]}
                        value={text}
                        multiline
                        numberOfLines={6}
                        onChangeText={changeText}
                        placeholderTextColor={theme.navigation.inactive}
                        placeholder={t("edit-note.text-input-placeholder")}
                    />
                    <CustomButton
                        buttonText={t("edit-note.save-button")}
                        icon="md-checkmark-circle"
                        onPress={() => updateItem(id)} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    noPadding: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 30,
    },
    screenHeading: {
        borderBottomWidth: 4,
        marginBottom: 20,
    },
    input: {
        borderWidth: 4,
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        fontFamily: "Ubuntu_500Medium",
        fontSize: 20,
    },
    inputMulti: {
        paddingVertical: 20,
        textAlignVertical: "top",
    }
});