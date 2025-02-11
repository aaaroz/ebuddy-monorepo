import { auth } from "@/config/firebase-config";
import { TSignInSchema } from "@/lib/schemas/sign-in-schema";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  storeCredentialsToCookie,
  storeUserTestingDataToCookie,
} from "@/service/auth-service";
import { TAuthResponse } from "@/lib/types/auth";

export async function signIn({
  password,
  email,
}: Omit<TSignInSchema, "showPassword">): Promise<TAuthResponse> {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const refreshToken = res.user.refreshToken;
    const idToken = await res.user.getIdToken();
    await Promise.all([
      storeCredentialsToCookie({ refreshToken, idToken }),
      storeUserTestingDataToCookie({
        id: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
      }),
    ]);
    return {
      ok: true,
      message: "User signed in successfully!",
      data: {
        id: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        token: idToken,
      },
    };
  } catch (err) {
    console.error(err);
    if (err instanceof FirebaseError) {
      if (err.code === "auth/invalid-login-credentials") {
        return {
          ok: false,
          message: "Your email or password is wrong!",
        };
      } else if (err.code === "auth/invalid-credential") {
        return {
          ok: false,
          message: "Your email or password is wrong!",
        };
      }
    }
    return {
      ok: false,
      message: "unknown error ! try again next time.",
    };
  }
}
