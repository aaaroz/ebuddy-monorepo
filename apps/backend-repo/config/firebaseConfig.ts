import * as admin from "firebase-admin";

// admin.initializeApp({
//     credential: admin.credential.cert({
//         projectId: "ebuddy-test-27a07",
//         clientEmail: "aaaroz@fake.mail",
//     }),
// });
const app = admin.initializeApp({
    projectId: "ebuddy-e0146",
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);
