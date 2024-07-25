import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
   return (
      <Tabs screenOptions={{
         tabBarActiveTintColor: '#FFA001',
         tabBarInactiveTintColor: '#CDCDE0',
         tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 2,
            borderTopColor: '#232533',
         }
      }}>
         <Tabs.Screen
            name='home'
            options={{
               title: 'Home',
               headerShown: false,
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
               )
            }}
         />
         <Tabs.Screen
            name='explore'
            options={{
               title: 'Explore',
               headerShown: false,
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
               )
            }}
         />
      </Tabs>
   )
}