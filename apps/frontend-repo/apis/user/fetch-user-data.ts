import { axiosInstance } from "@/config/axios-config";
import { TApisResponse, TAxiosResponse } from "@/lib/types/common";
import { AxiosError } from "axios";
import { TUser } from "entities";

type TApiResponse = TUser;

export async function fetchUserData(
    userId: TUser["id"],
): Promise<TApisResponse & { data?: TUser }> {
    try {
        const { data: result } = await axiosInstance.get<
            TAxiosResponse<TApiResponse>
        >("/v1/users/fetch-user-data", {
            params: {
                userId,
            },
        });
        return {
            ok: true,
            message: result.message,
            data: result.data,
        };
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            if (error.response.data) {
                return {
                    ok: false,
                    message: error.response.data,
                };
            }
            return {
                ok: false,
                message: error.message,
            };
        }
        return {
            ok: false,
            message: "unknown error ! try again next time.",
        };
    }
}
