import React from 'react';
import { Text } from 'react-native';

export const Heading = ({ shownText, customStyle, size }) => {
    return (
        <Text style={[customStyle, { fontSize: size }]}>{shownText}</Text>
    );
}