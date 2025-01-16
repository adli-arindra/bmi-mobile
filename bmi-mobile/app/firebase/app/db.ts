import { collection, addDoc, getFirestore, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { app } from "@/app/firebase/app/config";

const db = getFirestore(app);

const saveData = async (uid: string, weight: number, height: number) => {
    if (uid === "") {
        console.error("No user found!");
        return;
    }

    try {
        // Query Firestore for a document with the same uid
        const q = query(collection(db, "session"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Document exists, update the first matching document
            const docId = querySnapshot.docs[0].id; // Assume uid is unique, update the first match
            const docRef = doc(db, "session", docId);
            await setDoc(docRef, { weight, height }, { merge: true });
        } else {
            // Document does not exist, create a new one
            const newDocRef = doc(collection(db, "session"));
            await setDoc(newDocRef, { uid, weight, height });
        }

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const loadData = async (uid: string): Promise<{ weight: number; height: number } | null> => {
    if (uid === "") {
        console.error("uid is required to load data!");
        return null;
    }

    try {
        // Query Firestore for a document with the specified uid
        const q = query(collection(db, "session"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Return the weight and height from the first matching document
            const docData = querySnapshot.docs[0].data();
            return {
                weight: docData.weight,
                height: docData.height,
            };
        } else {
            console.warn("No data found for the given uid.");
            return null;
        }
    } catch (err) {
        console.error("Error loading data:", err);
        return null;
    }
};

const editBio = async (uid: string, bio: string) => {
    if (!uid) {
        console.error("No user ID provided!");
        return false;
    }

    try {
        const q = query(collection(db, "bio"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, "bio", docId);
            await setDoc(docRef, { bio }, { merge: true });
        } else {
            const newDocRef = doc(collection(db, "bio"));
            await setDoc(newDocRef, { uid, bio });
        }

        console.log("Bio successfully updated!");
        return true;
    } catch (err) {
        console.error("Error updating bio:", err);
        return false;
    }
};

const getBio = async (uid: string): Promise<any> => {
    if (!uid) {
        console.error("uid is required to get bio!");
        return "No bio";
    }

    try {
        const q = query(collection(db, "bio"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            return docData;
        } else {
            console.warn("No bio found for the given uid.");
            return "No bio";
        }
    } catch (err) {
        console.error("Error getting bio:", err);
        return "No bio";
    }
};


export { db, saveData, loadData, editBio, getBio };