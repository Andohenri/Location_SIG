import LocationProvider from "@/contexts/LocationProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{
          presentation: 'modal',
          animation: "slide_from_bottom",

        }} />
      </Stack>
    </LocationProvider>
  );
}
