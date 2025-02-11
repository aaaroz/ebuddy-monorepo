import { TUser } from "entities";
import { TApisResponse } from "./common";

export type TAuthResponse = TApisResponse & {
    data?: TUser & { token: string };
};
