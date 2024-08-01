import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Coordinate {
   lat: number;
   lng: number;
}
interface ExploreContextType {
   query: string | null;
   setQuery: (city: string) => void;
   coordinate: Coordinate | null;
   setCoordinate: (coordinate: Coordinate) => void;
}
const ExploreContext = createContext<ExploreContextType | null>(null);

export const useQuery = (): ExploreContextType => {
   const context = useContext(ExploreContext);
   if (!context) {
      throw new Error("useQuery doit etre a l'intetrieur d'un queryProvider");
   }
   return context;
}

const ExploreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [query, setQuery] = useState<string | null>(null);
   const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
   return (
      <ExploreContext.Provider value={{ query, setQuery, coordinate, setCoordinate }}>
         {children}
      </ExploreContext.Provider>
   )
}

export default ExploreProvider