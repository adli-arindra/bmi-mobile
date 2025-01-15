import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/firebase/config";

const db = getFirestore(app);

const add = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export { db, add };