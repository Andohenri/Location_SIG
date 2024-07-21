import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from '@/constants/apiKey'

interface LocationObject {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

const Home = () => {
  const [location, setLocation] = useState<null | LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation: LocationObject) => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (<>
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <MapView
        initialRegion={{
          latitude: location?.coords.latitude || -21.453611,
          longitude: location?.coords.longitude || 47.085833,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        style={{ width: '100%', height: '100%' }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        )}
        <Marker
          coordinate={{ latitude: -21.4606237, longitude: 47.1063029 }}
          description="My location"
          title='My position'
        />
      </MapView>

    </ThemedView>
    <GooglePlacesAutocomplete
      placeholder='Search...'
      onPress={(data, details = null) => {
        console.log(details);
        console.log(data);
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en'
      }}
      styles={{ textInputContainer: styles.textContainer, textInput: styles.textInput, predefinedPlacesDescription: { color: '#1faadb' } }}
    />
  </>)
}

export default Home

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    marginLeft: 16,
    marginRight: 16,
    height: 38,
    fontSize: 16
  }
})