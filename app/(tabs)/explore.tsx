import { FlatList, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useQuery } from '@/contexts/ExploreProvider'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from '@/constants/ApiKey'
import { nearPlace } from '@/constants/Data'
import ExploreCard from '@/components/ExploreCard'
import useMap from '@/hooks/useMap'
import { fetchPlaces } from '@/lib/map'

const Explore = () => {
   const { query, setQuery } = useQuery();
   // const { data, loading, refetch } = useMap(() => fetchPlaces(location?.coords.latitude ?? -21.453611, location?.coords.longitude || 47.085833, ['']));
   // const [places, setPlaces] = useState(data)
   return (
      <SafeAreaView style={{ height: '100%', backgroundColor: '#161622' }}>
         <ThemedView style={{ flex: 1, padding: 16 }}>
            <ThemedView style={{ zIndex: 10 }}>
               <ThemedView style={{ backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexDirection: 'row', marginBottom: 6 }}>
                  <ThemedText type='title'>Explorer</ThemedText>
                  <Image source={require('../../assets/images/logo.png')} resizeMode='contain' style={{ width: 40, height: 40 }} />
               </ThemedView>
               <GooglePlacesAutocomplete
                  placeholder='Search...'
                  onPress={(data, details = null) => {
                     const lat = details?.geometry.location.lat;
                     const lng = details?.geometry.location.lng;
                     setQuery(data.description);
                  }}
                  query={{
                     key: GOOGLE_API_KEY,
                     language: 'en'
                  }}
                  styles={{ textInputContainer: styles.textContainer, textInput: styles.textInput, predefinedPlacesDescription: { color: '#1faadb' } }}
               />
            </ThemedView>
            {query ? (
               <ThemedView style={{ marginTop: 70, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../assets/images/empty.png')} resizeMode='contain' style={{ width: 300, height: 300 }} />
                  <ThemedText type="subtitle" style={{ marginBottom: 16, textAlign: 'center' }}>Veuillez chercher une ville ou une place</ThemedText>
                  <ThemedText type="title" style={{ marginBottom: 16, textAlign: 'center' }}>Aucun résultat</ThemedText>
               </ThemedView>
            ) : (
               <ThemedView style={{ marginTop: 70, flex: 1 }}>
                  <ScrollView>
                     <ThemedText style={{ marginTop: 10 }} type='title'>London</ThemedText>
                     <ThemedText style={{ marginTop: 24, color: '#CDCDE0' }} type='subtitle'>A proximité</ThemedText>
                     <FlatList
                        data={nearPlace.results}
                        horizontal
                        keyExtractor={item => item.place_id}
                        renderItem={({ item }) => (
                           <ExploreCard place={item} />
                        )}
                        style={{ marginTop: 16 }}
                     />
                     <ThemedText style={{ marginTop: 24, color: '#CDCDE0' }} type='subtitle'>Populaire</ThemedText>
                     <FlatList
                        data={nearPlace.results}
                        horizontal
                        keyExtractor={item => item.place_id}
                        renderItem={({ item }) => (
                           <ExploreCard type='horizontal' place={item} />
                        )}
                        style={{ marginTop: 16 }}
                     />
                  </ScrollView>
               </ThemedView>
            )}
         </ThemedView>
         <StatusBar style="light" />
      </SafeAreaView>
   )
}

export default Explore

const styles = StyleSheet.create({
   textContainer: {
      marginTop: 16,

   },
   textInput: {
      color: '#161622',
      borderColor: '#FFA001',
      borderWidth: 2,
      paddingHorizontal: 16,
   },
})