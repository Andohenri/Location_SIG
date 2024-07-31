import { View, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { placeDetails } from '@/constants/Data';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LocationContext } from '@/contexts/LocationProvider';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@/constants/ApiKey';
import useMap from '@/hooks/useMap';
import { fetchPlaceDetails } from '@/lib/map';
import Review from '@/components/Review';

const PlaceDetails = () => {
   const { id } = useLocalSearchParams();
   const { data, loading, refetch } = useMap(() => fetchPlaceDetails(id));
   const [place, setPlace] = useState(placeDetails.result);
   const [distDur, setDistDur] = useState({
      distance: 0,
      duration: 0
   });
   const locationContext = useContext(LocationContext);
   if (!locationContext) {
      throw new Error("useContext doit etre utiliser dans LocationProvider");
   }
   const { location } = locationContext;
   const mapRef = useRef<MapView | null>(null)

   useEffect(() => {
      setPlace(data)
   }, [data, loading])

   useEffect(() => {
      refetch();
   }, [id])


   return (<>
      {loading ? (
         <ThemedView style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
         </ThemedView>
      ) : (
         <ScrollView>
            <ThemedView style={{ flex: 1 }}>
               <View style={styles.headerContainer}>
                  <View style={styles.navigation}>
                     <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='chevron-back' size={24} color="#" />
                     </TouchableOpacity>
                  </View>
                  {place?.photos?.length > 0 ? (
                     <Image source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${place.photos[0].width}&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
                        style={styles.image}
                        resizeMode="cover"
                     />
                  ) : (
                     <Image source={require('../../assets/images/thumbnail.png')} style={styles.image} resizeMode="cover" />
                  )}
                  <LinearGradient colors={['transparent', 'transparent', '#000000']} style={styles.description}>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, }}>
                        <View>
                           <View style={{ flexDirection: 'column', backgroundColor: 'transparent', marginBottom: 4 }}>
                              {place?.types.map((type: any, idx: any) => (
                                 <ThemedText style={{ color: 'white', marginHorizontal: 4 }} key={idx}>{type}</ThemedText>
                              ))}
                           </View>
                           <ThemedText type='subtitle' style={{ color: 'white' }}>{place?.name}</ThemedText>
                           <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                              <Ionicons name='star' size={24} color='yellow' />
                              <ThemedText type='defaultSemiBold' style={{ color: 'white' }}>{place?.rating} - ({place?.user_ratings_total}) reviews</ThemedText>
                           </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                              <Ionicons name='share-social-outline' color={'white'} size={24} />
                              <Ionicons name='bookmark-outline' color={'white'} size={24} />
                           </View>
                           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                              <ThemedText style={{ color: 'white', fontWeight: 800 }}>{distDur.duration.toFixed(1)} min.</ThemedText>
                              <ThemedText style={{ color: 'white', fontWeight: 800 }}>{distDur.distance.toFixed(2)} km</ThemedText>
                           </View>
                        </View>
                     </View>
                  </LinearGradient>
               </View>
               <View style={styles.bodyContainer}>
                  <View style={{ marginBottom: 16, gap: 10 }}>
                     <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, alignItems: 'center', gap: 10 }}>
                        {place?.opening_hours ? (<>
                           <Ionicons name='open' size={24} />
                           <ThemedText>Ouvert</ThemedText>
                        </>) : (<>
                           <Ionicons name='hourglass' size={18} color='white' />
                           <ThemedText>Fermé</ThemedText>
                        </>)}
                     </View>
                     <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                        <Ionicons name='pencil' size={20} color={'#FFA001'} />
                        <View>
                           <ThemedText type='subtitle'>{place?.formatted_address}</ThemedText>
                           <ThemedText type='default' style={{ color: '#ccc' }}>{place?.vicinity}</ThemedText>
                        </View>
                     </View>
                     <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                        <Ionicons name='phone-portrait' size={20} color={'#FFA001'} />
                        <ThemedText type='defaultSemiBold'>{place?.international_phone_number} ({place?.formatted_phone_number})</ThemedText>
                     </View>
                     <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                        <Ionicons name='planet' size={20} color={'#FFA001'} />
                        <ThemedText type='link'>{place?.website}</ThemedText>
                     </View>
                  </View>
                  <View style={{ marginBottom: 16, backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden' }}>
                     <MapView
                        ref={mapRef}
                        initialRegion={{
                           latitude: location?.coords.latitude || -21.453611,
                           longitude: location?.coords.longitude || 47.085833,
                           latitudeDelta: 0.0922,
                           longitudeDelta: 0.0421
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        style={{ width: '100%', height: 300 }}
                     >
                        {location && place && (<>
                           <MapViewDirections
                              origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                              destination={{ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }}
                              apikey={GOOGLE_API_KEY}
                              strokeWidth={3}
                              strokeColor="hotpink"
                              onReady={(result) => {
                                 setDistDur({ duration: result.duration, distance: result.distance })
                                 mapRef.current?.fitToCoordinates([{
                                    latitude: location?.coords.latitude,
                                    longitude: location?.coords.longitude
                                 }, {
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng
                                 }])
                              }}
                              onError={(error) => console.log(error)}
                           />
                           <Marker
                              key={place.place_id}
                              coordinate={{
                                 latitude: place.geometry.location.lat,
                                 longitude: place.geometry.location.lng,
                              }}
                              description={`${place.vicinity}--${place.types[0]}`}
                              title={place.name}
                           />
                        </>)}
                     </MapView>
                  </View>
                  <View style={{ marginTop: 16 }}>
                     <ThemedText type='subtitle' style={{ marginBottom: 16 }}>Quelques commentaires sur la place</ThemedText>
                     {place?.reviews?.slice(0, 5).map((item, idx) => (
                        <Review key={idx} review={item} />
                     ))}
                  </View>
               </View>
            </ThemedView >
            <StatusBar style='light' />
         </ScrollView >
      )}
   </>)
}

export default PlaceDetails

const styles = StyleSheet.create({
   headerContainer: {
      position: 'relative',
      height: 350,
      backgroundColor: '#ccc',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
   },
   image: {
      position: 'absolute',
      right: 0,
      height: 350,
      left: 0,
      top: 0,
      bottom: 0,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
   },
   description: {
      height: 350,
      justifyContent: 'flex-end',
      padding: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
   },
   navigation: {
      position: 'absolute',
      top: 26,
      left: 26,
      padding: 8,
      borderRadius: 50,
      backgroundColor: '#fff',
      zIndex: 10
   },
   bodyContainer: {
      padding: 16,
   }
})