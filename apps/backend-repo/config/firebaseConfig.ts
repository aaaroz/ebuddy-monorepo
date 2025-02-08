import * as admin from "firebase-admin";
import * as serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
  }),
});

if (process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}

export const db = admin.firestore();
export const auth = admin.auth();
