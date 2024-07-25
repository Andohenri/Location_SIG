import { GOOGLE_API_KEY } from "@/constants/ApiKey";
import axios from "axios";

export const fetchPlaces = async (latitude: number, longitude: number, types: string[]) => {
   try {
      const typeString = types.join('|');
      const response = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${typeString}&key=${GOOGLE_API_KEY}`
      );
      const results = response.data.results.map((place: any) => ({
         id: place.place_id,
         name: place.name,
         vicinity: place.vicinity,
         rating: place.rating,
         latitude: place.geometry.location.lat,
         longitude: place.geometry.location.lng,
      }));
      return results;
   } catch (error) {
      console.error(error);
   }
};

export async function placeDetails(id: string) {
   try {
      
   } catch (error) {
      
   }
}