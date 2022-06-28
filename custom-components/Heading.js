import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../themes/themesProvider';

export const Heading = ({ shownText, customStyle, size }) => {
    const { theme } = useTheme();

    return (
        <Text style={[customStyle, { fontFamily: "Koulen_400Regular", color: theme.textColor, fontSize: size }]}>{shownText}</Text>
    );
}