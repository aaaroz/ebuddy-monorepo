export type TApisResponse = {
    ok: boolean;
    message: string;
};

export type TAxiosResponse<T> = {
    message: string;
    data: T;
};
