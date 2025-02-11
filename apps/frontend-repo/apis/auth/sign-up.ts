import { auth } from "@/config/firebase-config";
import { TSignUpSchema } from "@/lib/schemas/sign-up-schema";
import { generateRandomData } from "@/lib/utils/generate-random-data";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { signIn } from "./sign-in";
import { calculatePriorityScore } from "@/lib/utils/calculate-priority-score";
import { axiosInstance } from "@/config/axios-config";

export async function signUp({
    name,
    password,
    email,
}: Omit<TSignUpSchema, "showPassword">) {
    try {
        const { totalAverageWeightRatings, numberOfRents } = generateRandomData();
        const recentlyActive = new Date().getTime();
        const priorityScore = calculatePriorityScore(
            totalAverageWeightRatings,
            numberOfRents,
            recentlyActive,
        );
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        await axiosInstance.post("/v1/users", {
            id: user.uid,
            name,
            email,
            totalAverageWeightRatings,
            numberOfRents,
            recentlyActive,
            priorityScore,
            createdAt: serverTimestamp(),
        });
        const { ok, message, data } = await signIn({ email, password });
        if (!ok) {
            throw new Error(message);
        }
        return {
            ok: true,
            message: "User signed up successfully!",
            data,
        };
    } catch (err) {
        console.error(err);
        if (err instanceof FirebaseError) {
            if (err.code === "auth/email-already-in-use") {
                return {
                    ok: false,
                    message: "email already in used, try another email!",
                };
            } else if (err.code === "auth/invalid-email") {
                return {
                    ok: false,
                    message: "email is not valid!",
                };
            }
            return {
                ok: false,
                message: "network request failed!",
            };
        }
        return {
            ok: false,
            message: "unknown error ! try again next time.",
        };
    }
}
