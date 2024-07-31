import { Image } from 'react-native'
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#161622' }}>
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={{uri: ""}} resizeMode='contain' style={{}} />
        <ThemedText type="subtitle" >Edit app/index.tsx to edit this screen.</ThemedText>
        <ThemedText type="link"><Link href={'/home'}>Go to Home</Link></ThemedText>
      </ThemedView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
