import { View, Image } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface Review {
   author_name: string;
   language: string;
   profile_photo_url: string;
   rating: number;
   relative_time_description: string;
}

const Review = ({ review }: any) => {
   return (
      <View style={{ padding: 6, gap: 4, borderWidth: 2, borderColor: '#ffffff10', borderRadius: 16, marginBottom: 16 }}>
         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
               <Image source={{ uri: review.profile_photo_url }} resizeMode='contain' style={{ width: 24, height: 24 }} />
               <ThemedText numberOfLines={1} type='subtitle'>{review.author_name}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
               <Ionicons name='star' size={18} color="yellow" />
               <ThemedText>{review.rating}</ThemedText>
            </View>
         </View>
         <View>
            <ThemedText style={{ color: '#CDCDE0' }} numberOfLines={5}>{review.text}</ThemedText>
         </View>
      </View>
   )
}

export default Review