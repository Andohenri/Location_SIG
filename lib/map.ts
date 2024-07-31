import { GOOGLE_API_KEY } from "@/constants/ApiKey";
import axios from "axios";

export const fetchPlaces = async (latitude: number, longitude: number, types: string[]) => {
   try {
      if(latitude === undefined || longitude === undefined) throw new Error();
      const typeString = types.join('|');
      const response = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${typeString}&key=${GOOGLE_API_KEY}`
      );
      const results = response.data.results
      return results;
   } catch (error) {
      console.error(error);
   }
};

export async function fetchPlaceDetails(id: any) {
   try {
      const response = await axios.get(
         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GOOGLE_API_KEY}`
      );
      const results = response.data.result
      return results;
   } catch (error) {
      console.error(error);
   }
}