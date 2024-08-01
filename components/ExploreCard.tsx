import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { router } from 'expo-router'
import { GOOGLE_API_KEY } from '@/constants/ApiKey'
import { LinearGradient } from 'expo-linear-gradient'

const ExploreCard = ({ place, type }: any) => {
   return (
      <TouchableOpacity onPress={() => router.push(`/place/${place.place_id}`)} style={{
         width: type === 'horizontal' ? 300 : 200,
         marginHorizontal: 4,
      }}>
         <ThemedView style={styles.card}>
            <LinearGradient
               colors={['transparent', '#000000']}
               style={{ height: type === 'horizontal' ? 200 : 300, zIndex: 10, position: 'absolute', left: 0, right: 0, bottom: 0 }}
            />
            <ThemedView style={styles.cardHeader}>
               {place?.photos?.length > 0 ? (
                  <Image
                     source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${place.photos[0].width}&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
                     resizeMode='cover'
                     style={{ width: '100%', height: type === 'horizontal' ? 200 : 300, borderRadius: 3 }}
                  />
               ) : (
                  <Image
                     source={require('../assets/images/thumbnail.png')}
                     resizeMode='cover'
                     style={{ width: '100%', height: type === 'horizontal' ? 200 : 300, borderRadius: 3 }}
                  />
               )}
            </ThemedView>
            <View style={styles.cardBody}>
               <ThemedText type='title'>{place.name}</ThemedText>
               <ThemedText type='subtitle' style={{ color: '#FFA001' }}>1 miles away</ThemedText>
            </View>
         </ThemedView>
      </TouchableOpacity>
   )
}

export default ExploreCard

const styles = StyleSheet.create({
   card: {
      position: 'relative',
      borderRadius: 4,
      elevation: 4
   },
   cardHeader: {
      padding: 2,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
   },
   cardBody: {
      padding: 16,
      zIndex: 20,
      position: 'absolute',
      left: 0, right: 0, bottom: 0
   }
})