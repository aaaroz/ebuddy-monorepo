import { TUser, userSchema } from "entities";

export type TGenericResponse<T, K> = {
    message: T;
    data?: K | K[] | null;
};

export type TPaginatedUser = {
    users: TUser[];
    lastUserId?: string;
};

export { type TUser, userSchema };
