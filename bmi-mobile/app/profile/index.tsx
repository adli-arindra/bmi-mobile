import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getUser } from '../firebase/app/auth';
import { editBio, getBio } from '../firebase/app/db';
import { usePersonContext } from '../components/personContext';
import { saveData } from '../firebase/app/db';

interface ChangedType {
    weight: boolean,
    height: boolean,
    bio: boolean
}

const ProfilePage = () => {
    const user = getUser();
    const [bio, setBio] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [editing, setEditing] = useState(false);
    const { person, setPerson } = usePersonContext()
    const [loaded, setLoaded] = useState(false);
    const [changed, setChanged] = useState({ 
        weight: false, 
        height: false, 
        bio: false
    });

    useEffect(() => {
        const fetch_edit_bio = async () => {
            const response = await editBio(user?.uid as string, bio);
            if (response) console.log("Editing bio success");
            else console.log("Editing bio failed");
        }
        if (!editing && loaded) {
            if (changed.bio) fetch_edit_bio();
            if (changed.weight || changed.height) {
                setPerson({ 
                    weight: parseInt(weight.replace(/[^0-9]/g, ""), 10), 
                    height: parseInt(height.replace(/[^0-9]/g, ""), 10),
                });
                saveData(
                    user?.uid as string, 
                    parseInt(weight.replace(/[^0-9]/g, ""), 10), 
                    parseInt(height.replace(/[^0-9]/g, ""), 10)
                )
            }
            setChanged({
                weight: false,
                height: false,
                bio: false
            });
        };
    }, [editing]);

    useEffect(() => {
        const fetch_get_bio = async () => {
            const response = await getBio(user?.uid as string);
            const data = response.bio;
            setBio(data);
            setLoaded(true);
        }

        fetch_get_bio();
        setWeight(person.weight.toString());
        setHeight(person.weight.toString());
    }, []);

    
    return (
        <View className="flex-1 bg-white items-center p-4">
        {/* Profile Picture */}
        <View className="mt-6">
            <Image
            source={require('../../assets/images/profile.jpg')}
            className="w-24 h-24 rounded-full border border-gray-400"
            />
        </View>

        {/* User Name */}
        <Text className="text-xl font-bold text-gray-800 mt-4">{user?.email || "Not logged in"}</Text>

        {/* Bio Section */}
        <View className="w-full mt-6 px-4">
            <Text className="text-lg font-semibold text-gray-700 mb-2">Bio</Text>
            {editing ? (
            <TextInput
                value={bio}
                onChangeText={(text) => {
                    setBio(text);
                    setChanged((prev) => ({
                        ...prev,
                        bio: true
                    }))
                }}
                placeholder="Write your bio here..."
                className="border border-gray-300 rounded-md p-2 text-gray-800"
            />
            ) : (
            <Text className="text-gray-600">{bio}</Text>
            )}
            <Text className="text-lg font-semibold text-gray-700 mb-2 mt-2">Weight</Text>
            {editing ? (
                <TextInput
                    value={weight}
                    onChangeText={(text) => {
                        setWeight(text);
                        setChanged((prev) => ({
                            ...prev,
                            weight: true
                        }))
                    }}
                    placeholder="Enter your weight"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded-md p-2 text-gray-800"
                />
            ) : (
                <Text className="text-gray-600">
                    {person.weight} Kg
                </Text>
            )}
            <Text className="text-lg font-semibold text-gray-700 mb-2 mt-2">Height</Text>
            {editing ? (
                <TextInput
                    value={height}
                    onChangeText={(text) => {
                        setHeight(text);
                        setChanged((prev) => ({
                            ...prev,
                            height: true
                        }))
                    }}
                    placeholder="Enter your height"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded-md p-2 text-gray-800"
                />
            ) : (
                <Text className="text-gray-600">
                    {person.height} cm
                </Text>
            )}
        </View>

        {/* Edit Button */}
        <TouchableOpacity
            onPress={() => setEditing(!editing)}
            className="mt-6 bg-blue-500 px-6 py-2 rounded-md"
        >
            <Text className="text-white font-semibold">
            {editing ? 'Save' : 'Edit'}
            </Text>
        </TouchableOpacity>
        </View>
    );
}

export default ProfilePage;