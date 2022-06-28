import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CustomText } from './CustomText';

import { useTheme } from '../themes/themesProvider';

export const CustomButton = ({ icon, buttonText, onPress, customStyle }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[componentStyles.button, customStyle, { borderColor: theme.textColor }]}
            onPress={onPress}>
            {icon != "" &&
                <Ionicons name={icon} size={30} color={theme.textColor} />}
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