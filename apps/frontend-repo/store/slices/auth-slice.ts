import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string | null;
        name: string | null;
        email: string | null;
    };
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: null,
        name: null,
        email: null,
    },
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<AuthState>) {
            console.log({ payload: action.payload })
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
            state.token = action.payload.token
        }
    },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
