import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.testDb')

import { Heading } from "../../custom-components/Heading";
import { CustomButton } from "../../custom-components/CustomButton";
import { useTheme } from '../../themes/themesProvider';

export const EditNote = ({ route, navigation }) => {
    const [title, changeTitle] = useState();
    const [text, changeText] = useState();
    const [id, setId] = useState();
    const { theme } = useTheme();

    const updateItem = (id) => {
        if (title == "" || text == "") {
            console.log('bad')
        } else {
            db.transaction(tx => {
                tx.executeSql('UPDATE items SET title = ?, text = ? where id = ?', [title, text, id])
            })
            console.log('changed')
            navigation.navigate('Notes');
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
    }, [])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText="Edit note"
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
                onChangeText={changeText}
                placeholderTextColor={theme.navigation.inactive}
                placeholder="Text, ex. Found new gym, should report."
            />
            <CustomButton
                buttonText="Save edits"
                icon="md-checkmark-circle"
                onPress={() => updateItem(id)} />
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