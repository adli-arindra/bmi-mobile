import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { getUser } from "@/app/firebase/app/auth";
import { useEffect, useState } from 'react';
import { sign_out } from '@/app/firebase/app/auth';
import { usePersonContext } from '@/app/components/personContext';
import { loadData, saveData } from '../firebase/app/db';
import { personInit } from '@/app/components/personContext';

const Header = () => {
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const { person, setPerson } = usePersonContext();
    const router = useRouter();

    useEffect(() => {
        try {
            const user = getUser();
            if (user) setSignedIn(true);
            else setSignedIn(false);
        } catch {
            setSignedIn(false);
        }
    }, []);

    useEffect(() => {
        const load_from_firestore = async () => {
            try {
                const { weight, height } = await loadData(getUser()?.uid as string) as { weight: number, height: number };
                setPerson({
                    weight: weight,
                    height: height,
                });
                console.log("Load success!");
            } catch (err) {
                console.error(err);
            }
        };

        if (signedIn) load_from_firestore();
    }, [signedIn]);

    const handleSignOut = async () => {
        try {
            try {
                saveData(getUser()?.uid || " ", person.weight, person.height);
            } catch (err) {
                console.error(err);
            }
            const response = await sign_out();
            if (response) {
                setSignedIn(false);
                setPerson(personInit);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>DinoFit</Text>
            {signedIn ? (
                <View style={styles.buttonContainer}>
                    <Button title="Sign Out" onPress={handleSignOut} color="#9DB5B2" />
                    <Button title="Profile" onPress={() => { router.push('/profile' as RelativePathString); }} color="#9DB5B2" />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up" onPress={() => { router.push('/sign-up' as RelativePathString); }} color="#9DB5B2" />
                    <Button title="Login" onPress={() => { router.push('/sign-in' as RelativePathString); }} color="#9DB5B2" />
                </View>
            )}
        </View>
    );
};

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        height: isMobile ? 60 : 80, // Responsif untuk tinggi header
        backgroundColor: '#3B413C',
        paddingHorizontal: 10,
        justifyContent: 'space-between', // Pastikan elemen tersusun dengan rapi
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: isMobile ? 24 : 24, // Ukuran font responsif
        fontWeight: 'bold',
        textAlign: 'left', // Posisi kiri
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center', // Pastikan tombol tidak keluar
        marginRight: 10, // Jarak dari ujung kanan
    },
});


export default Header;
