import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const CardPlace = ({ place }: any) => {
   return (
      <ThemedView style={styles.container}>
         <TouchableOpacity onPress={() => router.push('/modal')} style={{flex: 1}}>
            <Image source={require('../assets/images/thumbnail.png')} style={{ width: '100%', height: 48, borderRadius: 4 }} />
            <ThemedView style={styles.cardBody}>
               <ThemedText numberOfLines={1} type='subtitle' style={{ fontSize: 12 }}>{place.name}</ThemedText>
               <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons size={16} name='star' style={{ color: 'yellow' }} />
                  <ThemedText type='subtitle' style={{ fontSize: 12, color: '#c0c0c0' }}>{place.rating ?? 0} ({place.user_ratings_total ?? 0})</ThemedText>
               </ThemedView>
            </ThemedView>
         </TouchableOpacity>
      </ThemedView>
   )
}

export default CardPlace

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 4,
      width: 100,
      elevation: 2,
   },
   cardBody: {
      padding: 4,
      flex: 1,
   }
})