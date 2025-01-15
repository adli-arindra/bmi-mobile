import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth"
import { app } from "../config"

const auth = getAuth(app);

const signUp = async (email: string, password: string) : Promise<string> => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        return "";
    } catch(err) {
        console.error(err);
        return "Email already in use! Sign In instead";
    }
}

const signIn = async (email: string, password: string) : Promise<boolean> => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

interface UserType {
    email: string,
    token: string
}

const getUser = async () => {
    try {
        const user = auth.currentUser;
        console.log(user);
    } 
    catch(err) {
        console.error(err);
    }
}

export { auth, signUp, signIn, getUser };