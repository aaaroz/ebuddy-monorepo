import { refreshAccessToken } from "@/apis/auth/refresh-access-token";
import { verify } from "@/apis/auth/verify";
import {
    getCredentialsFromCookie,
    getUserTestingDataFromCookie,
    storeCredentialsToCookie,
} from "@/service/auth-service";
import { setAuthState } from "@/store/slices/auth-slice";
import { TUser } from "entities";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    const checkAuth = useCallback(async () => {
        try {
            const { idToken, refreshToken } = await getCredentialsFromCookie();
            if (!idToken && !refreshToken) return

            if (idToken === "test-access-token") {
                const { id, name, email } = await getUserTestingDataFromCookie();
                dispatch(
                    setAuthState({
                        isAuthenticated: true,
                        user: {
                            id,
                            name,
                            email,
                        },
                        token: idToken,
                    }),
                );
                return;
            }

            const { data } = await verify(idToken);

            if (!data || !idToken) {
                const response = await refreshAccessToken(refreshToken);
                if (!response) {
                    throw new Error("Failed to refresh access token");
                }

                const { user, accessToken, refreshToken: newRefreshToken } = response;

                await storeCredentialsToCookie({
                    idToken: accessToken,
                    refreshToken: newRefreshToken,
                });

                dispatch(
                    setAuthState({
                        isAuthenticated: true,
                        user: {
                            id: user.id as string,
                            name: user.name as string,
                            email: user.email as string,
                        },
                        token: accessToken,
                    }),
                );
                return;
            }

            const user: Pick<TUser, "id" | "email" | "name"> = {
                id: data.id,
                email: data.email,
                name: data.name ?? "",
            };

            dispatch(
                setAuthState({
                    isAuthenticated: true,
                    user: {
                        id: user.id as string,
                        name: user.name as string,
                        email: user.email as string,
                    },
                    token: idToken,
                }),
            );
        } catch (error) {
            console.log("Authentication check failed:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
};

