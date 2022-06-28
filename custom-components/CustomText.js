import React from 'react';
import { Text } from 'react-native';

export const CustomText = ({ shownText, customStyle }) => {
    return (
        <Text style={[customStyle, {}]}>{shownText}</Text>
    );
}