import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut } from "firebase/auth"
import { app } from "@/app/firebase/app/config"

const auth = getAuth(app);

const sign_up = async (email: string, password: string) : Promise<string> => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign Up success!")
        return "";
    } catch(err) {
        console.error(err);
        return "Email already in use! Sign In instead";
    }
}

const sign_in = async (email: string, password: string) : Promise<boolean> => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sign In success!");
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

const sign_out = async () : Promise<boolean> => {
    try {
        const response = await signOut(auth);
        console.log("Sign Out success!");
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getUser = () => {
    try {
        const user = auth.currentUser;
        if (user) {
            return user;
        }
        else {
            throw new Error("No user found");
        }
    } 
    catch(err) {
        console.error(err);
    }
}

export { auth, sign_up, sign_in, sign_out, getUser };