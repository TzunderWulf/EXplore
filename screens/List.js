import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Flatlist, ActivityIndicator } from 'react-native';

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from '../themes/themesProvider';

export const List = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isFetching, setFetching] = useState(true);
    const { theme } = useTheme();

    /**
    * Fetch gyms from webservice.
    */
    const getGyms = () => {
        fetch('https://stud.hosted.hr.nl/1006859/webservice/gymList.json')
            .then((response) => response.json())
            .then((results) => {
                setData(results.gyms);
                setFetching(false);
            })
            .catch((error) => console.log(error));
    };


    /**
    * Function to render an item of the flatlist.
    *
    * @param item
    */
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.gym, { borderBottomColor: theme.textColor }]}>
                <Heading
                    shownText={item.name}
                    size={30} />
                <CustomButton
                    buttonText="View gym on map"
                    icon="md-location"
                    onPress={() => navigation.navigate('Map', {
                        latitude:
                            item.lat, longitude: item.long
                    })} />
            </View>
        );
    }

    useEffect(() => {
        getGyms();
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Heading
                shownText="All gyms"
                customStyle={[styles.screenHeading, { borderBottomColor: theme.textColor }]}
                size={50} />
            {isFetching ? <ActivityIndicator size="large" color="#DC143C" /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={renderItem} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    screenHeading: {
        borderBottomWidth: 4,
        marginBottom: 10,
    },
    gym: {
        paddingVertical: 20,
        borderBottomWidth: 4,
    }
});