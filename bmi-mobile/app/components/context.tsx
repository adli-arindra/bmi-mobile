import React, { createContext, useState, ReactNode, useContext, Children } from 'react';

interface FoodContextType {
  food: string;
  setFood: (food: string) => void;
}

export const foodContext = createContext<FoodContextType>({
  food: '',
  setFood: () => {}
});

export const useFoodContext = () => {
  return useContext(foodContext);
}

export const FoodProvider = ({children} : {children: React.ReactNode}) => {
  const [ food, setFood ] = useState('');

  return(
    <foodContext.Provider value={{ food, setFood }}>
      { children }
    </foodContext.Provider>
  );
};