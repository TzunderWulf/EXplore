import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Flatlist, ActivityIndicator } from 'react-native';

import { Heading } from "../custom-components/Heading";
import { CustomButton } from "../custom-components/CustomButton";
import { FlatList } from "react-native-gesture-handler";

export const List = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isFetching, setFetching] = useState(true);

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
            <View style={styles.gym}>
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
        <View style={styles.container}>
            <Heading
                shownText="All gyms"
                customStyle={[styles.screenHeading, { borderBottomColor: "#18191b" }]}
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
        borderBottomColor: "#18191b",
        borderBottomWidth: 4,
    }
});