import React, { useEffect, useState } from "react";
import { StyleSheet, View, FLatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { CustomText } from "../custom-components/CustomText";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from '../themes/themesProvider';

const db = SQLite.openDatabase('db.testDb')

export const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();
    const { theme } = useTheme();

    /**
     * Get all items from the database. Function runs only the screen gets
     * focused on, not when user move away.
     */
    const getItems = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM items', null, (_, { rows: { _array } }) => setNotes(_array))
        });
    }

    /**
     * Get all items from the database. Function runs only the screen gets
     * focused on, not when user move away.
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
                    buttonText="View note"
                    icon="md-reader"
                    onPress={() => navigation.navigate("View note", { id: item.id })} />
                <CustomButton
                    buttonText="Edit note"
                    icon="md-pencil"
                    onPress={() => navigation.navigate("Edit note", { id: item.id, title: item.title, text: item.text })} />
                <CustomButton
                    buttonText="Remove note"
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
                shownText="Notes"
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <CustomButton
                buttonText="Create new note"
                icon="md-add-circle"
                onPress={() => navigation.navigate("Add note")} />
            {notes.length == 0 ? <CustomText shownText="No notes" /> : (
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
        paddingTop: '10%',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    screenHeading: {
        borderBottomWidth: 4,
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        paddingVertical: 30,
    },
    note: {
        paddingVertical: 20,
        borderBottomColor: "#18191b",
        borderBottomWidth: 4,
    }
});