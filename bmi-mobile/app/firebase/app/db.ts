import { collection, addDoc, getFirestore, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { app } from "@/app/firebase/config";

const db = getFirestore(app);

const saveData = async (email: string, weight: number, height: number) => {
    if (email === "") {
        console.error("No user found!");
        return;
    }

    try {
        // Query Firestore for a document with the same email
        const q = query(collection(db, "session"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Document exists, update the first matching document
            const docId = querySnapshot.docs[0].id; // Assume email is unique, update the first match
            const docRef = doc(db, "session", docId);
            await setDoc(docRef, { weight, height }, { merge: true });
        } else {
            // Document does not exist, create a new one
            const newDocRef = doc(collection(db, "session"));
            await setDoc(newDocRef, { email, weight, height });
        }

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const loadData = async (email: string): Promise<{ weight: number; height: number } | null> => {
    if (email === "") {
        console.error("Email is required to load data!");
        return null;
    }

    try {
        // Query Firestore for a document with the specified email
        const q = query(collection(db, "session"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Return the weight and height from the first matching document
            const docData = querySnapshot.docs[0].data();
            return {
                weight: docData.weight,
                height: docData.height,
            };
        } else {
            console.warn("No data found for the given email.");
            return null;
        }
    } catch (err) {
        console.error("Error loading data:", err);
        return null;
    }
};

export { db, saveData, loadData };