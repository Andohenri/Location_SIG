import { Image } from 'react-native'
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '@/components/CustomButton';

export default function Index() {
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#161622' }}>
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Image source={require('../assets/images/logo.png')} resizeMode='contain' style={{ height: 300, width: 300, marginBottom: 24 }} />
        <ThemedText type="title" style={{ marginBottom: 16, textAlign: 'center' }}>Bienvenue sur MapMaker</ThemedText>
        <ThemedText type="subtitle" style={{ marginBottom: 16, textAlign: 'center' }}>Découvrer l'application ultime pour visualiser les places interéssants dans le monde.</ThemedText>
        <CustomButton title={"Allez découvrir"} handlePress={() => router.push('/home')} />
      </ThemedView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
