import { useEffect, useState } from 'react';
import { ImageSourcePropType, ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import FoodCard from '../components/foodCard';
import { foodsInit, useFoodContext, UserCreatedFoods } from './foodContext';
import { PersonType, usePersonContext } from '@/app/components/personContext';
import { RelativePathString, router } from 'expo-router';

const GetBMI = (weight: number, height: number): number => {
    return weight / ((height / 100) * (height / 100));
};

const getColorBasedOnBMI = (bmi: number) => {
    if (bmi > 30) return 'red';
    if (bmi > 25) return 'orange';
    if (bmi > 21.5) return 'blue';
    if (bmi > 18.5) return 'green';
    return 'black';
};

const Lab = () => {
    const { food, setFood } = useFoodContext();
    const { person, setPerson } = usePersonContext();

    const [selectedFood, setSelectedFood] = useState<string | null>(null); // State untuk food yang dipilih

    const bmi = GetBMI(person?.weight, person?.height);

    var path;
    if (bmi > 30) path = require("@/assets/images/body/300.png");
    else if (bmi > 25) path = require("@/assets/images/body/250.png");
    else if (bmi > 21.5) path = require("@/assets/images/body/230.png");
    else if (bmi > 18.5) path = require("@/assets/images/body/185.png");
    else path = require("@/assets/images/body/0.png");

    useEffect(() => {
        if (food !== undefined) {
            let currWeight = person.weight;
            currWeight += food.WeightDiff;
            if (currWeight < 0) currWeight = 0;
            let newPerson: PersonType = {
                weight: currWeight,
                height: person.height,
            };
            setPerson(newPerson);
        }
        setFood(undefined);
    }, [food]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>YOU</Text>
                <View style={styles.centered}>
                    <Image source={path} style={styles.image} resizeMode="contain" />
                    <Text style={[styles.bmiText, { color: getColorBasedOnBMI(bmi) }]}>BMI - {bmi.toFixed(2)}</Text>
                </View>
                <View style={styles.weightHeight}>
                    <View style={styles.btn}><Text>{person.weight} kg</Text></View>
                    <View style={styles.btn}><Text>{person.height} cm</Text></View>
                </View>
            </View>
            <View style={styles.foodChoices}>
                <Text style={styles.foodTitle}>FOOD CHOICES</Text>
                <Text style={styles.subtitle}>Makan apa hari ini?</Text>
                <ScrollView style={styles.scroll} horizontal={true}>
                    <View style={styles.foodRow}>
                        {foodsInit.map((food, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedFood(food.Name)} // Set makanan yang dipilih
                                style={[
                                    styles.foodCard,
                                    selectedFood === food.Name && styles.selectedFoodCard // Conditional style
                                ]}
                                activeOpacity={1} // Efek dim ketika ditekan
                            >
                                <FoodCard
                                    Name={food.Name}
                                    Calories={food.Calories}
                                    Description={food.Description}
                                    Path={food.Path}
                                    Type={food.Type}
                                    WeightDiff={food.WeightDiff}
                                />
                            </TouchableOpacity>
                        ))}
                        {UserCreatedFoods.map((food, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedFood(food.Name)}
                                style={[
                                    styles.foodCard,
                                    selectedFood === food.Name && styles.selectedFoodCard
                                ]}
                                activeOpacity={1}
                            >
                                <FoodCard
                                    Name={food.Name}
                                    Calories={food.Calories}
                                    Description={food.Description}
                                    Path={{ uri: food.Path } as ImageSourcePropType}
                                    Type={food.Type}
                                    WeightDiff={food.WeightDiff}
                                />
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => { router.push('/make' as RelativePathString); }}
                            style={styles.addButton}>
                            <View style={styles.addIcon}>
                                <Text style={styles.addText}>+</Text>
                            </View>
                            <Text style={styles.addLabel}>Add New</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F8F3',
        minHeight: '100%',
        width: '100%',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 10,
        padding: 20,
    },
    title: {
        color: '#333',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    bmiText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    weightHeight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        gap: 10,
    },
    btn: {
        backgroundColor: '#DAF0EE',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
    },
    foodChoices: {
        backgroundColor: 'transparent',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },
    foodTitle: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    scroll: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        maxHeight: 200,
    },
    foodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    foodCard: {
        backgroundColor: '#DAF0EE',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedFoodCard: {
        backgroundColor: '#94D1BE',
        borderColor: '#38D1F6',
        borderWidth: 2,
    },
    addButton: {
        padding: 15,
        borderRadius: 20,
        backgroundColor: '#DAF0EE',
    },
    addIcon: {
        backgroundColor: '#C4C4C4',
        borderRadius: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addLabel: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default Lab;