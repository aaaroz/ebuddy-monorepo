import { TUser } from "entities"

export type TAuthResponse = {
    ok: boolean
    message: string
    data?: TUser & { token: string }
}
