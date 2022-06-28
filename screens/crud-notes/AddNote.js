import React, { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.testDb')

import { Heading } from "../../custom-components/Heading";
import { CustomButton } from "../../custom-components/CustomButton";
import { useTheme } from '../../themes/themesProvider';

export const AddNote = ({ navigation }) => {
    const [title, changeTitle] = useState("");
    const [text, changeText] = useState("");
    const { theme } = useTheme();

    const saveNote = () => {
        if (title == "" || text == "") {
            console.log('bad')
        } else {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO items (title, text) values (?, ?)', [title, text])
            })
            navigation.navigate('Notes');
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText="Notes"
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <TextInput
                style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
                value={title}
                onChangeText={changeTitle}
                placeholderTextColor={theme.navigation.inactive}
                placeholder="Title for note, ex. New gym"
            />
            <TextInput
                style={[styles.input, styles.inputMulti, { color: theme.textColor, borderColor: theme.textColor }]}
                value={text}
                multiline
                numberOfLines={6}
                placeholderTextColor={theme.navigation.inactive}
                onChangeText={changeText}
                placeholder="Text, ex. Found new gym, should report."
            />
            <CustomButton
                buttonText="Save new note"
                icon="md-checkmark-circle"
                onPress={saveNote} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
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