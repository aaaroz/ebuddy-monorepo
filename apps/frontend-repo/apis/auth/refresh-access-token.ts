import axios from "axios";
import { auth } from "@/config/firebase-config";
import { TUser } from "entities";
import { verify } from "./verify";

type RefreshTokenResult = {
    accessToken: string;
    refreshToken: string;
    user: TUser;
};
export const refreshAccessToken = async (
    refreshToken: string,
): Promise<RefreshTokenResult | null> => {
    try {
        const response = await axios.post(
            `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            },
        );

        const { id_token: accessToken, refresh_token } = response.data;

        const currentUser = auth.currentUser;
        if (!currentUser) {
            const { data } = await verify(accessToken);
            const user: TUser = {
                id: data.id,
                email: data.email,
                name: data.name ?? "",
            };
            return {
                accessToken,
                refreshToken: refresh_token,
                user,
            };
        }
        if (!currentUser) {
            throw new Error("No current user");
        }

        const user: TUser = {
            id: currentUser.uid,
            email: currentUser.email as string,
            name: currentUser.displayName || "",
        };

        return {
            accessToken,
            refreshToken: refresh_token,
            user,
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};
