import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/firebase/config";

const db = getFirestore(app);

export { db };