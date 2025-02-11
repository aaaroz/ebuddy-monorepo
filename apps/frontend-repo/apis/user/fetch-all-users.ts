import { axiosInstance } from "@/config/axios-config";
import { TApisResponse, TAxiosResponse } from "@/lib/types/common";
import { AxiosError } from "axios";
import { TUser } from "entities";

type TApiResponse = {
    users: TUser[];
    lastUserId?: string;
};

export async function fetchAllUsers(
    limit = 5,
    lastUserId?: string,
): Promise<TApisResponse & { data: TUser[]; lastUserId?: string }> {
    try {
        const { data: result } = await axiosInstance.get<
            TAxiosResponse<TApiResponse>
        >("/v1/users", {
            params: {
                limit,
                lastUserId,
            },
        });
        return {
            ok: true,
            message: result.message,
            data: result.data.users,
            lastUserId: result.data.lastUserId,
        };
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            if (error.response.data) {
                return {
                    ok: false,
                    message: error.response.data,
                    data: [],
                    lastUserId: undefined,
                };
            }
            return {
                ok: false,
                message: error.message,
                data: [],
                lastUserId: undefined,
            };
        }
        return {
            ok: false,
            message: "unknown error ! try again next time.",
            data: [],
            lastUserId: undefined,
        };
    }
}
