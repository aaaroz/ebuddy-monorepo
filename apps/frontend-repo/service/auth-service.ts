"use server";

import { cookies } from "next/headers";

const IS_DEV = process.env.NODE_ENV === "development";
interface Credentials {
    refreshToken: string;
    idToken: string;
}

interface UserTestingData {
    id: string;
    name: string;
    email: string;
}

export const storeCredentialsToCookie = async ({
    refreshToken,
    idToken,
}: Credentials) => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    const cookieStore = await cookies();
    if (IS_DEV) {
        cookieStore.set("idToken", "test-access-token");
        return;
    }
    cookieStore.set("refreshToken", refreshToken);
    cookieStore.set("idToken", idToken, { expires });
};

export const removeCredentialsFromCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");
    cookieStore.delete("idToken");
};

export const getCredentialsFromCookie = async (): Promise<Credentials> => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");
    const idToken = cookieStore.get("idToken");
    return {
        refreshToken: refreshToken?.value,
        idToken: idToken?.value,
    };
};

export const storeUserTestingDataToCookie = async ({
    id,
    name,
    email,
}: UserTestingData): Promise<void> => {
    const cookieStore = await cookies();
    if (!IS_DEV) return;
    cookieStore.set(
        "userTestingData",
        JSON.stringify({
            id,
            name,
            email,
        }),
    );
};

export const getUserTestingDataFromCookie =
    async (): Promise<UserTestingData> => {
        const cookieStore = await cookies();
        const userTestingData = cookieStore.get("userTestingData");

        return JSON.parse(userTestingData.value);
    };
