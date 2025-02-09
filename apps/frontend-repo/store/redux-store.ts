import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';

const store = () => configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;
