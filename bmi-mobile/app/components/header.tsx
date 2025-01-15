import { View, Button } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { getUser } from "@/app/firebase/app/auth";
import { useEffect, useState } from 'react';
import { sign_out } from '@/app/firebase/app/auth';

const Header = () => {
    const [ signedIn, setSignedIn] = useState<boolean>(false);
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

    const handleSignOut = async () => {
        try {
            const response = await sign_out();
            if (response) {
                setSignedIn(false);
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
