import { View, Button } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { getUser } from "@/app/firebase/app/auth";
import { useEffect, useState } from 'react';
import { sign_out } from '@/app/firebase/app/auth';
import { usePersonContext } from './personContext';
import { loadData, saveData } from '../firebase/app/db';
import { personInit } from './personContext';

const Header = () => {
    const [ signedIn, setSignedIn] = useState<boolean>(false);
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
                const { weight, height } = await loadData(getUser()?.email as string) as { weight: number, height: number };
                setPerson({
                    weight: weight,
                    height: height
                });
                console.log("Load success!")
            } catch(err) {
                console.error(err);
            }
        }

        if (signedIn) load_from_firestore();

    }, [signedIn]);

    const handleSignOut = async () => {
        try {
            try {
                saveData(getUser()?.email || " ", person.weight, person.height );
            } catch(err) {
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
    }

    const navigateToSignUp = () => {
        router.push('/sign-up' as RelativePathString);
    };

    const navigateToSignIn = () => {
        router.push('/sign-in' as RelativePathString);
    }

    return (
        <View className='flex flex-row w-screen'>
            { signedIn ?
                <Button title="Sign Out" onPress={handleSignOut}/>
                :
                <>
                <Button title="Go to Sign Up" onPress={navigateToSignUp}/>
                <Button title="Go to Sign In" onPress={navigateToSignIn}/>
                </>
            }
        </View>
    );
};

export default Header;
