import { axiosInstance } from "@/config/axios-config";
import { TApisResponse, TAxiosResponse } from "@/lib/types/common";
import { AxiosError } from "axios";
import { TUser } from "entities";

type TApiResponse = TUser;

export async function updateUserData(
    userData: TUser,
): Promise<TApisResponse & { data?: TUser }> {
    try {
        const { data: result } = await axiosInstance.put<
            TAxiosResponse<TApiResponse>
        >("/v1/users/update-user-data", userData);
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
