import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { GOOGLE_API_KEY } from '@/constants/ApiKey'

const CardPlace = ({ place }: any) => {
   return (
      <TouchableOpacity onPress={() => router.push(`/place/${place.place_id}`)} style={styles.container}>
         <ThemedView style={styles.card}>
            <ThemedView style={styles.cardHeader}>
               {place?.photos?.length > 0 ? (
                  <Image
                     source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${place.photos[0].width}&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
                     resizeMode='cover'
                     style={{ width: '100%', height: 48, borderRadius: 3 }}
                  />
               ) : (
                  <Image
                     source={require('../assets/images/thumbnail.png')}
                     resizeMode='cover'
                     style={{ width: '100%', height: 48, borderRadius: 3 }}
                  />
               )}
            </ThemedView>
            <ThemedView style={styles.cardBody}>
               <ThemedText numberOfLines={1} type='subtitle' style={{ fontSize: 12 }}>{place.name}</ThemedText>
               <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons size={12} name='star' style={{ color: 'yellow' }} />
                  <ThemedText type='subtitle' style={{ fontSize: 12, color: '#c0c0c0' }}>{place.rating ?? 0} ({place.user_ratings_total ?? 0})</ThemedText>
               </ThemedView>
            </ThemedView>
         </ThemedView>
      </TouchableOpacity>
   )
}

export default CardPlace

const styles = StyleSheet.create({
   container: {
      width: 100,
      marginHorizontal: 4,
   },
   card: {
      borderRadius: 4,
      elevation: 4
   },
   cardHeader: {
      padding: 2,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
   },
   cardBody: {
      padding: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
   }
})