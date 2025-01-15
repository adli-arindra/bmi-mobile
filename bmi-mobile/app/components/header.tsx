import { View, Button } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { getUser } from "@/app/firebase/app/auth";

const Header = () => {
    const router = useRouter();

    const user = getUser();

    console.log(user);

    const navigateToSignUp = () => {
        router.push('/sign-up' as RelativePathString);
    };

    const navigateToSignIn = () => {
        router.push('/sign-in' as RelativePathString);
    }

    return (
        <View className='flex flex-row w-screen'>
            <Button title="Go to Sign Up" onPress={navigateToSignUp}/>
            <Button title="Go to Sign In" onPress={navigateToSignIn}/>
        </View>
    );
};

export default Header;
