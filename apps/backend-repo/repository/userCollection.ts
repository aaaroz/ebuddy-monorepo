import { db } from "../config/firebaseConfig";
import { type TUser } from 'entities'
import { type TPaginatedUser } from "../entities/types";

export const updateUser = async (userId: string, userData: TUser) => {
    try {
        await db.collection("users").doc(userId).update({ ...userData })
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user: " + error);
    }
}

export const getUsers = async (limit: number, lastUserId?: string): Promise<TPaginatedUser> => {
    try {
        const snapshot = await db.collection('USERS').get();

        // Step 2: Compute priorityScore for each user
        const users = snapshot.docs.map((doc) => {
            const userData = doc.data();
            const priorityScore =
                (userData.totalAverageWeightRatings * 1000000) +
                (userData.numberOfRents * 1000) +
                (userData.recentlyActive / 1000);

            return {
                id: doc.id,
                name: userData.name,
                email: userData.email,
                totalAverageWeightRatings: userData.totalAverageWeightRatings,
                numberOfRents: userData.numberOfRentsa,
                recentlyActive: userData.recentlyActive,
                priorityScore,
            };
        });

        // Step 3: Sort users by priorityScore in descending order
        users.sort((a, b) => b.priorityScore - a.priorityScore);

        // Step 4: Implement pagination
        let paginatedUsers;
        if (lastUserId) {
            // Find the index of the last user from the previous page
            const lastIndex = users.findIndex((user) => user.id === lastUserId);
            if (lastIndex === -1) {
                throw new Error('Invalid lastUserId');
            }
            paginatedUsers = users.slice(lastIndex + 1, lastIndex + 1 + limit);
        } else {
            paginatedUsers = users.slice(0, limit);
        }

        // Extract the lastUserId for the next page
        const lastUser = paginatedUsers[paginatedUsers.length - 1];
        const newLastUserId = lastUser ? lastUser.id : undefined;

        return { users: paginatedUsers, lastUserId: newLastUserId };
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user: " + error);
    }
};
