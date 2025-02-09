import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { removeCredentialsFromCookie } from "@/service/auth-service";

export async function signOut() {
    try {
        await firebaseSignOut(auth);
        removeCredentialsFromCookie()
    } catch (err) {
        console.error(err);
    }
}
