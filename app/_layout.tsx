import LocationProvider from "@/contexts/LocationProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="place/[id]" options={{
          presentation: 'modal',
          headerShown: false,
          animation: "slide_from_bottom"
        }} />
      </Stack>
    </LocationProvider>
  );
}
