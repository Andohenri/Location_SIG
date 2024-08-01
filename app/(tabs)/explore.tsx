import { FlatList, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useQuery } from '@/contexts/ExploreProvider'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from '@/constants/ApiKey'
import ExploreCard from '@/components/ExploreCard'
import { fetchPlaces } from '@/lib/map'

const Explore = () => {
   const { query, setQuery, coordinate, setCoordinate } = useQuery();
   const [loading, setLoading] = useState(false);
   const [places, setPlaces] = useState<any>([]);
   const [sortedPlaces, setSortedPlaces] = useState<any>([]);

   useEffect(() => {
      if (coordinate) {
         (async () => {
            try {
               setLoading(true);
               const results = await fetchPlaces(coordinate.lat, coordinate.lng, ['']);
               setPlaces(results);
               const sorted = results.sort((a: any, b: any) => b.user_rating_total - a.user_rating_total);
               setSortedPlaces(sorted);
            } catch (error) {
               console.log("Error: " + error);
            } finally {
               setLoading(false);
            }
         })();
      }
   }, [coordinate])

   return (
      <SafeAreaView style={{ height: '100%', backgroundColor: '#161622' }}>
         <ThemedView style={{ flex: 1, padding: 16, position: 'relative' }}>
            <ThemedView style={{ zIndex: 1 }}>
               <ThemedView style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10, flexDirection: 'row', marginBottom: 6 }}>
                  <ThemedText type='title'>Explorer</ThemedText>
                  <Image source={require('../../assets/images/logo.png')} resizeMode='contain' style={{ width: 40, height: 40 }} />
               </ThemedView>
            </ThemedView>
            <GooglePlacesAutocomplete
               placeholder='Rechercher...'
               onPress={(data, details = null) => {
                  if (details) {
                     const { lat, lng } = details.geometry.location;
                     setCoordinate({ lat, lng });
                  }
                  setQuery(data.description);
               }}
               fetchDetails={true}
               query={{
                  key: GOOGLE_API_KEY,
                  language: 'en'
               }}
               styles={{
                  container: styles.autocompleteContainer,
                  textInputContainer: styles.textInputContainer,
                  textInput: styles.textInput,
                  listView: styles.listView,
               }}
            />
            {loading ? (
               <ThemedView style={{ marginTop: 70, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator />
               </ThemedView>
            ) : !coordinate ? (
               <ThemedView style={{ backgroundColor: '#ccc', marginTop: 70, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../assets/images/empty.png')} resizeMode='contain' style={{ width: 300, height: 300 }} />
                  <ThemedText type="subtitle" style={{ marginBottom: 16, textAlign: 'center' }}>Veuillez chercher une ville ou une place</ThemedText>
                  <ThemedText type="title" style={{ marginBottom: 16, textAlign: 'center' }}>Aucun résultat</ThemedText>
               </ThemedView>
            ) : (
               <ThemedView style={{ marginTop: 70, flex: 1 }}>
                  <ScrollView>
                     <ThemedText style={{ marginTop: 10 }} type='title'>{query}</ThemedText>
                     <ThemedText style={{ marginTop: 24, color: '#CDCDE0' }} type='subtitle'>A proximité</ThemedText>
                     <FlatList
                        data={places}
                        horizontal
                        keyExtractor={item => item.place_id}
                        renderItem={({ item }) => (
                           <ExploreCard place={item} />
                        )}
                        style={{ marginTop: 16 }}
                     />
                     <ThemedText style={{ marginTop: 24, color: '#CDCDE0' }} type='subtitle'>Populaire</ThemedText>
                     <FlatList
                        data={sortedPlaces}
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
   autocompleteContainer: {
      position: 'absolute',
      top: 70,
      left: 16,
      right: 16,
      zIndex: 1,
   },
   textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
   },
   listView: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      zIndex: 2,
   },
   textInput: {
      color: '#161622',
      borderColor: '#FFA001',
      borderWidth: 2,
      paddingHorizontal: 16,
   },
})