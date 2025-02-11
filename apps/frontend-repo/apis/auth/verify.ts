import { axiosInstance } from "@/config/axios-config";
import { TAxiosResponse } from "@/lib/types/common";
import { AxiosError } from "axios";
import { TUser } from "entities";

type TApiResponse = TUser;
export async function verify(idToken: string) {
  try {
    const { data: result } = await axiosInstance.post<
      TAxiosResponse<TApiResponse>
    >("/v1/auth/verify", { idToken });
    return {
      ok: true,
      message: result.message,
      data: result.data,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      if (err.response.data) {
        return {
          ok: false,
          message: err.response.data,
        };
      }
      return {
        ok: false,
        message: err.message,
      };
    }
    return {
      ok: false,
      message: "unknown error ! try again next time.",
    };
  }
}
