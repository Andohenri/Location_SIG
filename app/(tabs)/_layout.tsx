import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
   return (
      <Tabs>
         <Tabs.Screen
            name='home'
            options={{
               title: 'Home',
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
               )
            }}
         />
         <Tabs.Screen
            name='explore'
            options={{
               title: 'Explore',
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'search-circle' : 'search-circle-outline'} color={color} />
               )
            }}
         />
      </Tabs>
   )
}