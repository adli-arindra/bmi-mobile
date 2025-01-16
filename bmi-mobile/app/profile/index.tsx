import { View, Text, Image, TextInput, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { getUser } from '../firebase/app/auth';
import { editBio, getBio } from '../firebase/app/db';
import { usePersonContext } from '../components/personContext';
import { saveData } from '../firebase/app/db';
import { useRouter } from 'expo-router';

interface ChangedType {
    weight: boolean;
    height: boolean;
    bio: boolean;
}

const ProfilePage = () => {
    const user = getUser();
    const [bio, setBio] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [editing, setEditing] = useState(false);
    const { person, setPerson } = usePersonContext();
    const [loaded, setLoaded] = useState(false);
    const [changed, setChanged] = useState<ChangedType>({
        weight: false,
        height: false,
        bio: false,
    });
    const router = useRouter();

    useEffect(() => {
        const fetch_edit_bio = async () => {
            const response = await editBio(user?.uid as string, bio);
            if (response) console.log('Editing bio success');
            else console.log('Editing bio failed');
        };
        if (!editing && loaded) {
            if (changed.bio) fetch_edit_bio();
            if (changed.weight || changed.height) {
                setPerson({
                    weight: parseInt(weight.replace(/[^0-9]/g, ''), 10),
                    height: parseInt(height.replace(/[^0-9]/g, ''), 10),
                });
                saveData(
                    user?.uid as string,
                    parseInt(weight.replace(/[^0-9]/g, ''), 10),
                    parseInt(height.replace(/[^0-9]/g, ''), 10)
                );
            }
            setChanged({
                weight: false,
                height: false,
                bio: false,
            });
        }
    }, [editing]);

    useEffect(() => {
        const fetch_get_bio = async () => {
            const response = await getBio(user?.uid as string);
            const data = response.bio;
            setBio(data);
            setLoaded(true);
        };

        fetch_get_bio();
        setWeight(person.weight.toString());
        setHeight(person.height.toString());
    }, []);

    return (
        <View style={styles.container}>
            {/* Tombol Back */}
            <View style={styles.backButtonContainer}>
                <Button
                    title="Back"
                    onPress={() => router.replace('/')}
                    color="#3B413C"
                />
            </View>

            {/* Profile Picture */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/profile.jpg')}
                    style={styles.profileImage}
                />
            </View>

            {/* User Name */}
            <Text style={styles.userName}>{user?.email || 'Not logged in'}</Text>

            {/* Bio Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Bio</Text>
                {editing ? (
                    <TextInput
                        value={bio}
                        onChangeText={(text) => {
                            setBio(text);
                            setChanged((prev) => ({
                                ...prev,
                                bio: true,
                            }));
                        }}
                        placeholder="Write your bio here..."
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.infoText}>{bio}</Text>
                )}

                <Text style={styles.label}>Weight</Text>
                {editing ? (
                    <TextInput
                        value={weight}
                        onChangeText={(text) => {
                            setWeight(text);
                            setChanged((prev) => ({
                                ...prev,
                                weight: true,
                            }));
                        }}
                        placeholder="Enter your weight"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.infoText}>{person.weight} Kg</Text>
                )}

                <Text style={styles.label}>Height</Text>
                {editing ? (
                    <TextInput
                        value={height}
                        onChangeText={(text) => {
                            setHeight(text);
                            setChanged((prev) => ({
                                ...prev,
                                height: true,
                            }));
                        }}
                        placeholder="Enter your height"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.infoText}>{person.height} cm</Text>
                )}
            </View>

            {/* Edit Button */}
            <TouchableOpacity
                onPress={() => setEditing(!editing)}
                style={styles.editButton}
            >
                <Text style={styles.editButtonText}>
                    {editing ? 'Save' : 'Edit'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAF0EE',
        padding: 20,
    },
    backButtonContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#3B413C',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#3B413C',
    },
    section: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#3B413C',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#9DB5B2',
        borderRadius: 8,
        padding: 8,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        color: '#3B413C',
    },
    infoText: {
        fontSize: 16,
        color: '#3B413C',
        marginBottom: 15,
    },
    editButton: {
        backgroundColor: '#94D1BE',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
