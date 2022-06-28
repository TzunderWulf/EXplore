import React, { useEffect, useState } from "react";
import { StyleSheet, View, Share } from 'react-native';
import * as SQLite from 'expo-sqlite';

import { Heading } from "../../custom-components/Heading";
import { CustomText } from "../../custom-components/CustomText";
import { CustomButton } from "../../custom-components/CustomButton";
import { useTheme } from '../../themes/themesProvider';

const db = SQLite.openDatabase('db.testDb')

export const Note = ({ navigation, route }) => {
    const [note, setNote] = useState({});
    const { theme } = useTheme();

    const getNote = (id) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM items WHERE id = ?', [id], (_, { rows: { _array } }) => setNote(_array[0]))
        });

    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                "message": `I shared this note from the EXplore app:\n"${note.text}"`,
            })
            if (result.action == Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
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
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {note != {} && (
                <View>
                    <Heading
                        shownText={"Note #" + note.id}
                        customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
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
                    <CustomButton
                        icon="md-share-social"
                        buttonText="Share this note"
                        onPress={onShare}
                        customStyle={styles.shareButton} />
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
    },
    shareButton: {
        marginVertical: 20,
    }
});