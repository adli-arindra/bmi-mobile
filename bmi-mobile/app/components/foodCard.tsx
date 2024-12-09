import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { foodContext } from '@/app/components/lab';

const FoodCard = ({ Name, Description, Calories, Type }: { Name: string, Description: string, Calories: string, Type: string }) => {
    const state = useContext(foodContext);
    const selected = state.food === Name;

    // const Path: string = "@/assets/images/food/" + Name + ".png";
    const yo = "@/assets/images/food/" + "Beef" + ".png";
    
    var Path = require("@/assets/images/icon.png");
    switch (Name) {
        case 'Beef':
            Path = require("@/assets/images/food/Beef.png");
            break;
        case 'Chickin':
            Path = require("@/assets/images/food/Chickin.png");
            break;
        case 'Salad':
            Path = require("@/assets/images/food/Salad.png");
            break;
        case 'Chilli':
            Path = require("@/assets/images/food/Chilli.png");
            break;
        case 'Choco':
            Path = require("@/assets/images/food/Chocolate.png");
            break;
        case 'Fries':
            Path = require("@/assets/images/food/Fries.png");
            break;
        case 'Paper':
            Path = require("@/assets/images/food/Paper.png");
            break;
        case 'Hammer':
            Path = require("@/assets/images/food/Hammer.png");
            break;
    }

    return (
        <View
            className={`flex flex-col items-center justify-center rounded-2xl ${selected ? 'bg-accent' : 'bg-neutral'}`}
        >
            <TouchableOpacity
                onPress={() => {
                    state.setFood(Name);
                }}
                className="flex flex-col items-center justify-center gap-1">
                <Image 
                    source={Path}
                    style={{ width: 30, height: 30 }} 
                    resizeMode="contain"
                />
                <Text className="text-lg font-bold text-center">{Name}</Text>
                {/* <Text className="text-sm text-center">{Description}</Text> */}
                <View className="badge badge-outline text-xs text-center">
                    <Text>{Calories}</Text>
                </View>
                <View className="badge badge-outline text-xs text-center">
                    <Text>{Type}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FoodCard;
