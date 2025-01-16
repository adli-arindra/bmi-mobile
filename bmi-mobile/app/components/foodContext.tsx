import React, { createContext, useState, ReactNode, useContext, Children, Dispatch, SetStateAction } from 'react';
import { FoodType } from './foodCard';

interface FoodContextType {
  food: FoodType | undefined;
  setFood: Dispatch<SetStateAction<FoodType | undefined>>;
}

export const foodContext = createContext<FoodContextType | undefined>( undefined );

export const useFoodContext = () => {
  return useContext(foodContext) as FoodContextType;
}

export const FoodProvider = ({children} : {children: React.ReactNode}) => {
  const [ food, setFood ] = useState<FoodType | undefined>(undefined);

  return(
    <foodContext.Provider value={{ food, setFood }}>
      { children }
    </foodContext.Provider>
  );
};

export const foodsInit: FoodType[] = [
  {
      Name: "Chickin",
      Description: "Kukuruyuk",
      Calories: "239 cal",
      Type: "Meat",
      Path: require("@/assets/images/food/Chickin.png"),
      WeightDiff: 1,
  },
  {
      Name: "Beef",
      Description: "Mooo",
      Calories: "482 cal",
      Type: "Meat",
      Path: require("@/assets/images/food/Beef.png"),
      WeightDiff: 2,
  },
  {
      Name: "Choco",
      Description: "Sweet",
      Calories: "555 cal",
      Type: "Store",
      Path: require("@/assets/images/food/Chocolate.png"),
      WeightDiff: 3
  },
  {
      Name: "Fries",
      Description: "Nice",
      Calories: "311 cal",
      Type: "Good",
      Path: require("@/assets/images/food/Fries.png"),
      WeightDiff: 4
  },
  {
      Name: "Salad",
      Description: "Yummy",
      Calories: "114 cal",
      Type: "Veggies",
      Path: require("@/assets/images/food/Salad.png"),
      WeightDiff: -1
  },
  {
      Name: "Chilli",
      Description: "Hot",
      Calories: "40 cal",
      Type: "Veggies",
      Path: require("@/assets/images/food/Chilli.png"),
      WeightDiff: -2
  },
  {
      Name: "Paper",
      Description: "why",
      Calories: "0 cal",
      Type: "UAS",
      Path: require("@/assets/images/food/Paper.png"),
      WeightDiff: -3
  },
  {
      Name: "Hammer",
      Description: "DO NOT",
      Calories: "-782 cal",
      Type: "???",
      Path: require("@/assets/images/food/Hammer.png"),
      WeightDiff: -4
  },
]