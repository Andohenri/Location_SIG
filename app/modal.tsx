import { View, Text } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Modal = () => {
   const isPresented = router.canGoBack();
   return (
      <ThemedView>
         <ThemedText type='title'>Modal</ThemedText>
         {!isPresented && <ThemedText type='link'><Link href={'/home'}>Dismiss</Link></ThemedText>}
      </ThemedView>
   )
}

export default Modal