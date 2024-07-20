import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const Explore = () => {
   return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ThemedText type='defaultSemiBold'>Explore</ThemedText>
      </ThemedView>
   )
}

export default Explore

const styles = StyleSheet.create({})