import React, { useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import i18n from "i18n-js";

import { useTheme } from '../../themes/themesProvider';
import { CustomButton } from "../../custom-components/CustomButton";
import { Heading } from "../../custom-components/Heading";
import { FlatList } from "react-native-gesture-handler";

export const LanguageSelection = ({ navigation }) => {
    const { theme } = useTheme();

    const languages = [{
        id: 1,
        name: "en-US",
    },
    {
        id: 2,
        name: "nl-NL",
    },
    {
        id: 3,
        name: "de-DE",
    }
    ];

    const t = (key) => { return i18n.t(key) }

    /**
     * Function to render an item of the flatlist.
     *
     * @param item
     */
    const renderItem = ({ item }) => {
        return (
            <View>
                <CustomButton
                    icon={i18n.locale == item.name ? "md-checkmark-circle" : ""}
                    buttonText={t(`language-selection.avaiable-languages.${item.name}`)}
                    onPress={() => {
                        i18n.locale = item.name;
                        navigation.navigate("Settings");
                    }} />
            </View>
        );
    }

    useEffect(() => {
        navigation.setOptions({
            title: t("language-selection.header-title")
        })
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText={t("language-selection.heading")}
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            <FlatList
                data={languages}
                renderItem={renderItem}
            />
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
});