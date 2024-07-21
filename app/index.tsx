import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText type="subtitle" >Edit app/index.tsx to edit this screen.</ThemedText>
      <ThemedText type="link"><Link href={'/home'}>Go to Home</Link></ThemedText> 
    </ThemedView>
  );
}
