import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export const AddNote = () => {
    return (
        <View style={styles.container}>
            <Text>Open up AddNote.js to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});