import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CustomText } from './CustomText';

export const CustomButton = ({ icon, buttonText, onPress, customStyle }) => {

    return (
        <TouchableOpacity
            style={componentStyles.button}
            onPress={onPress}>
            {icon != "" &&
                <Ionicons name={icon} size={30} color="black" />}
            {buttonText != "" &&
                <CustomText shownText={buttonText} customStyle={componentStyles.buttonText} />}
        </TouchableOpacity>
    );
}

const componentStyles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        borderWidth: 4,
        borderRadius: 16,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        marginHorizontal: 10,
        marginVertical: 5,
    }
})