import { auth, db } from "../config/firebaseConfig";

export const createUser = async (email: string, password: string) => {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });

    await db.collection("users").doc(userRecord.uid).set({
      email: userRecord.email,
      uid: userRecord.uid,
      createdAt: new Date().toISOString(),
    });

    return userRecord;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user: " + error);
  }
};

export const getUsers = async () => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => doc.data());

    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user: " + error);
  }
};
