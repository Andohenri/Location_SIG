import { FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import useMap from '@/hooks/useMap'
import { fetchPlaces } from '@/lib/map'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  const listRef = useRef<FlatList<any>>(null);
  const locationContext = useContext(LocationContext);
  if (!locationContext) {
    throw new Error("useContext doit etre utiliser dans LocationProvider");
  }
  const { location } = locationContext;
  const { data, loading, refetch } = useMap(() => fetchPlaces(location?.coords.latitude ?? -21.453611, location?.coords.longitude || 47.085833, ['']));
  const [places, setPlaces] = useState(data)

  useEffect(() => {
    setPlaces(data)
  }, [data, loading])

  useEffect(() => {
    refetch();
  }, [])

  const handleMarkerPress = (placeId: string) => {
    const index = places.findIndex((place: any) => place.place_id === placeId);
    if (index !== -1 && listRef.current)
      listRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
  }

  return (
    <ThemedView style={{ flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient colors={['transparent', '#fff']} style={{ height: 100, right: 0, left: 0, bottom: 0, zIndex: 10, position: 'absolute' }} />
      <MapView
        initialRegion={{
          latitude: location?.coords.latitude || -21.453611,
          longitude: location?.coords.longitude || 47.085833,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
      >
        {places?.map((place: any) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            description={`${place.vicinity}--${place.types[0]}`}
            title={place.name}
            onPress={() => handleMarkerPress(place.place_id)}
          >
            <View style={{ backgroundColor: "#fff", padding: 2, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: 50, borderWidth: 2, borderColor: '#ccc',  elevation: 5, width: 20, height: 20 }}>
              <Image source={{ uri: `${place.icon}` }} resizeMode='contain' style={{width: 16, height: 16}} />
            </View>
          </Marker>
        ))}
      </MapView>
      <ThemedView style={{ position: 'absolute', top: 0, width: '100%', backgroundColor: 'transparent', paddingHorizontal: 16, paddingTop: 48 }}>
        <LinearGradient colors={['#fff', 'transparent']} style={{ height: '100%', right: 0, left: 0, position: 'absolute' }} />
        <ThemedView style={{ backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 6 }}>
          <ThemedText type='title' style={{ color: '#161622' }}>L-SIG</ThemedText>
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
      <StatusBar style='dark' />
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    borderRadius: 24,
  },
  textInput: {
    borderColor: '#FFA001',
    borderWidth: 1,
    paddingHorizontal: 16,
    elevation: 2
  },
  list: {
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
  }
})