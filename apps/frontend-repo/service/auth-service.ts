'use server'

import { cookies } from "next/headers"

interface Credentials {
    refreshToken: string
    idToken: string
}

export const storeCredentialsToCookie = async ({ refreshToken, idToken }: Credentials) => {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 10);
    const cookieStore = await cookies()
    cookieStore.set('refreshToken', refreshToken, { expires })
    cookieStore.set('idToken', idToken, { expires })
}

export const removeCredentialsFromCookie = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('refreshToken')
    cookieStore.delete('idToken')
}

export const getCredentialsFromCookie = async (): Promise<Credentials> => {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')
    const idToken = cookieStore.get('idToken')
    return {
        refreshToken: refreshToken.value, idToken: idToken.value
    }
}
