import { db } from "../config/firebaseConfig";
import { type TPaginatedUser, type TUser } from "../entities/types";

export const updateUser = async (userData: TUser): Promise<TUser | void> => {
    try {
        await db
            .collection("users")
            .doc(userData.id)
            .update({ ...userData });

        const userDoc = await db.collection("users").doc(userData.id).get();
        return userDoc.data() as TUser;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating user: " + error);
    }
};

export const createUser = async (userData: TUser): Promise<void> => {
    try {
        await db
            .collection("users")
            .doc(userData.id)
            .set({
                ...userData,
            });
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user: " + error);
    }
};

export const getUserData = async (userId: string): Promise<TUser | void> => {
    try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            throw "User doesn't exists!";
        }
        return userDoc.data() as TUser;
    } catch (error) {
        console.error(error);
        throw new Error("Error get user: " + error);
    }
};

export const getUsers = async (
    limit: number,
    lastUserId?: string,
): Promise<TPaginatedUser> => {
    try {
        let query = db
            .collection("users")
            .orderBy("priorityScore", "desc")
            .limit(limit);

        if (lastUserId) {
            const lastVisibleSnapshot = await db
                .collection("users")
                .where("id", "==", lastUserId)
                .get();

            if (!lastVisibleSnapshot.empty) {
                const lastDoc = lastVisibleSnapshot.docs[0];
                query = query.startAfter(lastDoc);
            } else {
                return { users: [], lastUserId: undefined };
            }
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            return { users: [], lastUserId: undefined };
        }

        const users: TUser[] = [];
        let newLastUserId: string | undefined;

        snapshot.forEach((doc) => {
            const {
                name,
                email,
                totalAverageWeightRatings,
                numberOfRents,
                recentlyActive,
                priorityScore,
            } = doc.data() as TUser;

            users.push({
                id: doc.id,
                name,
                email,
                totalAverageWeightRatings,
                numberOfRents,
                recentlyActive,
                priorityScore,
            });

            newLastUserId = doc.id;
        });

        return { users, lastUserId: newLastUserId };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users: " + error);
    }
};
