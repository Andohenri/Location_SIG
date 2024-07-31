import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

const CustomButton = ({ title, handlePress }: any) => {
   return (
      <TouchableOpacity
         onPress={handlePress}
         style={{ backgroundColor: '#FFA001', borderRadius: 12, minHeight: 60, alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
         <ThemedText style={{ color: '#161622', fontWeight: '700', fontSize: 24 }}>{title}</ThemedText>
      </TouchableOpacity>
   )
}

export default CustomButton