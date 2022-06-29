import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export const Map = ({ route }) => {
    const [data, setData] = useState([]);
    const [isFetching, setFetching] = useState(true);
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);

    /**
    * Fetch gyms from webservice.
    */
    const getGyms = () => {
        fetch("https://stud.hosted.hr.nl/1006859/webservice/gymList.json")
            .then((response) => response.json())
            .then((results) => {
                setData(results.gyms);
                setFetching(false);
            })
            .catch((error) => console.log(error));
    };

    /**
    * Ask permission to see location, after permission get location.
    */
    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            setLocation("Permission to access location was denied.");
        }

        // Get location and store the coords
        let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        setLocation(JSON.stringify({ latitude, longitude }));

        // Let the map focus in on the fetched location
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    }

    useEffect(() => {
        getGyms();
    }, []);

    useEffect(() => {
        getLocationAsync();
    }, [isFetching]);

    /**
    * When you navigate from list, focuses map on marker location.
    */
    useEffect(() => {
        if (route.params !== undefined) {
            const { latitude, longitude } = route.params;
            setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0092,
                longitudeDelta: 0.0091
            })
        }
    }, [route.params])

    return (
        <View style={styles.container}>
            {isFetching ? <ActivityIndicator size="large" color="#DC143C" /> : (
                <MapView
                    style={styles.map}
                    region={region}
                >
                    {location !== null &&
                        <Marker
                            key="user"
                            title="User's location"
                            coordinate={JSON.parse(location)}
                        />
                    }
                    {data.map((item) => {
                        return (
                            <Marker
                                key={item.id}
                                coordinate={{
                                    latitude: item.lat,
                                    longitude: item.long
                                }}
                                title={item.name}
                            />
                        );
                    })}
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    noMapContainer: {
        flex: 1,
        paddingTop: "10%",
        paddingHorizontal: 30,
        backgroundColor: "#fff",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});