import { FlatList, Image, StyleSheet } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from '@/constants/ApiKey'
import { LocationContext } from '@/contexts/LocationProvider'
import { nearPlace } from '@/constants/Data'
import CardPlace from '@/components/CardPlace'
import { toast } from '@/lib/toast'

const Home = () => {
  const [places, setPlaces] = useState(nearPlace.results)
  const listRef = useRef<FlatList<any>>(null);
  const locationContext = useContext(LocationContext);
  if (!locationContext) {
    throw new Error("useContext doit etre utiliser dans LocationProvider");
  }
  const { location } = locationContext;

  const handleMarkerPress = (placeId: string) => {
    const index = places.findIndex(place => place.place_id === placeId);
    if(index !== -1 && listRef.current)
    listRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
  }

  return (
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
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
      >
        {places?.map(place => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            image={{ uri: `${place.icon}` }}
            description={`${place.vicinity}--${place.types[0]}`}
            title={place.name}
            onPress={() => handleMarkerPress(place.place_id)}
          />
        ))}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        )}
      </MapView>
      <ThemedView style={{ position: 'absolute', top: 0, width: '100%', backgroundColor: 'transparent', paddingHorizontal: 16, paddingTop: 48 }}>
        <LinearGradient colors={['#fff', 'transparent']} style={{ height: '100%', right: 0, left: 0, position: 'absolute' }} />
        <ThemedView style={{ backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 6 }}>
          <ThemedText type='title'>L-SIG</ThemedText>
          <Image source={require('../../assets/images/react-logo.png')} resizeMode='contain' style={{ width: 32, height: 32 }} />
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
      </ThemedView>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={places}
        horizontal
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => (
          <CardPlace place={item} />
        )}
      />
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    borderRadius: 24
  },
  textInput: {
    paddingHorizontal: 16,
    elevation: 2
  },
  list: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
  }
})