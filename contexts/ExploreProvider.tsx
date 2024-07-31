import React, { createContext, ReactNode, useContext, useState } from 'react'
interface ExploreContextType {
   query: string | null;
   setQuery: (city: string) => void;
}
const ExploreContext = createContext<ExploreContextType | null>(null);

export const useQuery = (): ExploreContextType =>{
   const context = useContext(ExploreContext);
   if(!context){
      throw new Error("useQuery doit etre a l'intetrieur d'un queryProvider");
   }
   return context;
}

const ExploreProvider: React.FC<{children: ReactNode}> = ({children}) => {
   const [query, setQuery] = useState<string | null>(null);
   return (
      <ExploreContext.Provider value={{query, setQuery}}>
         {children}
      </ExploreContext.Provider>
   )
}

export default ExploreProvider