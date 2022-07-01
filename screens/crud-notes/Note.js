import React, { useEffect, useState } from "react";
import { StyleSheet, View, Share } from "react-native";
import * as SQLite from "expo-sqlite";
import i18n from "i18n-js";

import { Heading } from "../../custom-components/Heading";
import { CustomText } from "../../custom-components/CustomText";
import { CustomButton } from "../../custom-components/CustomButton";
import { useTheme } from "../../themes/themesProvider";

const db = SQLite.openDatabase("db.testDb")

export const Note = ({ navigation, route }) => {
    const [note, setNote] = useState({});
    const { theme } = useTheme();

    const t = (key) => { return i18n.t(key) }

    /**
    * Get specific note out of the database with the id.
    * 
    * @param id
    */
    const getItem = (id) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM items WHERE id = ?", [id], (_, { rows: { _array } }) => setNote(_array[0]))
        });
    }

    /**
    * Share functionality for a note, opens up the phone's sharing options.
    * Shares the text of the note.
    */
    const onShare = async () => {
        try {
            const result = await Share.share({
                "message": `I shared this note from the EXplore app:\n"${note.text}"`,
            })
            if (result.action == Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // Shared
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        if (route.params?.id) {
            let { id } = route.params;
            getItem(id);
        } else {
            // Send user back if no id is found.
            navigation.navigate("Notes")
        }

        navigation.setOptions({
            title: t("view-note.header-title")
        })
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {note != {} && (
                <View>
                    <Heading
                        shownText={t("view-note.heading") + note.id}
                        customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                        size={50} />
                    <CustomText
                        shownText={note.title}
                        customStyle={styles.subject}
                    />
                    <CustomText
                        shownText={note.text}
                        customStyle={styles.content}
                    />
                    <CustomButton
                        icon="md-share-social"
                        buttonText={t("view-note.share-button")}
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
        backgroundColor: "#fff",
    },
    screenHeading: {
        borderBottomWidth: 4,
        marginBottom: 20,
    },
    subject: {
        fontSize: 30,
        marginBottom: 20,
    },
    content: {
        fontSize: 20,
    },
    noteTitle: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    shareButton: {
        marginVertical: 20,
    }
});