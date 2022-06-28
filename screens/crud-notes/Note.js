import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

import { Heading } from "../../custom-components/Heading";
import { CustomText } from "../../custom-components/CustomText";

const db = SQLite.openDatabase('db.testDb')

export const Note = ({ navigation, route }) => {
    const [note, setNote] = useState({});

    const getNote = (id) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM items WHERE id = ?', [id], (_, { rows: { _array } }) => setNote(_array[0]))
        });

    }

    useEffect(() => {
        if (route.params?.id) {
            let { id } = route.params;
            getNote(id);
        } else {
            navigation.navigate("Notes")
        }
    }, [])

    return (
        <View style={styles.container}>
            {note != {} && (
                <View>
                    <Heading
                        shownText={"Note #" + note.id}
                        customStyle={[styles.screenHeading, { borderBottomColor: "#18191b" }]}
                        size={50} />
                    <View style={styles.noteTitle}>
                        <CustomText
                            shownText="Title: "
                            customStyle={styles.subject}
                        />
                        <CustomText
                            shownText={note.title}
                            customStyle={styles.subject}
                        />
                    </View>
                    <CustomText
                        shownText="Note:"
                        customStyle={styles.subject}
                    />
                    <CustomText
                        shownText={note.text}
                        customStyle={styles.content}
                    />
                </View>
            )}
        </View>
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
    subject: {
        fontSize: 30,
    },
    content: {
        fontSize: 20,
    },
    noteTitle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
});