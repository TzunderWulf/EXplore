import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../themes/themesProvider';

export const CustomText = ({ shownText, customStyle }) => {
    const { theme } = useTheme();

    return (
        <Text style={[customStyle, { color: theme.textColor, fontFamily: "Ubuntu_500Medium" }]}>{shownText}</Text>
    );
}