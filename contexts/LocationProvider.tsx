import { createContext, useEffect, useState } from 'react';
import * as Location from "expo-location"
import { toast } from '@/lib/toast';

interface LocationContextType {
   location: Location.LocationObject | null;
}
export const LocationContext = createContext<LocationContextType | null>(null);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [location, setLocation] = useState<Location.LocationObject | null>(null);

   useEffect(() => {
      (async () => {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            toast('Permission to access location was denied');
            return;
         }

         let location = await Location.getCurrentPositionAsync({});
         setLocation(location);

         Location.watchPositionAsync(
            {
               accuracy: Location.Accuracy.High,
               timeInterval: 10000,
               distanceInterval: 10,
            },
            (newLocation: Location.LocationObject) => {
               setLocation(newLocation);
            }
         );
      })();
   }, []);
   return (
      <LocationContext.Provider value={{ location }}>
         {children}
      </LocationContext.Provider>
   )
}

export default LocationProvider;