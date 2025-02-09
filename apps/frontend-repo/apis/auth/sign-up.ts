import { auth, db } from "@/config/firebase-config";
import { TSignUpSchema } from "@/lib/schemas/sign-up-schema";
import { generateRandomData } from "@/lib/utils/generate-random-data";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signIn } from "./sign-in";

export async function signUp({ name, password, email }: Omit<TSignUpSchema, 'showPassword'>) {
    try {
        const { totalAverageWeightRatings, numberOfRents } = generateRandomData()
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        const userCollection = collection(db, 'users')
        await addDoc(userCollection, {
            id: user.uid,
            name,
            email,
            totalAverageWeightRatings,
            numberOfRents,
            recentlyActive: serverTimestamp(),
            createdAt: serverTimestamp()
        })
        const { ok, message, data } = await signIn({ email, password })
        if (!ok) {
            throw new Error(message)
        }
        return {
            ok: true,
            message: 'User signed up successfully!',
            data
        }
    } catch (err) {
        console.error(err);
        if (err instanceof FirebaseError) {
            if (err.code === "auth/email-already-in-use") {
                return {
                    ok: false,
                    message: "email already in used, try another email!"
                }
            } else if (err.code === "auth/invalid-email") {
                return {
                    ok: false,
                    message: "email is not valid!"
                }
            }
            return {
                ok: false,
                message: "network request failed!"
            }
        }
        return {
            ok: false,
            message: "unknown error ! try again next time.",
        }
    }

}
