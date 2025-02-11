import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import userDataReducer from "./slices/user-data-slice";
import usersReducer from "./slices/users-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducers = combineReducers({
    authReducer,
    userDataReducer,
    usersReducer,
});

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducers = persistReducer(persistConfig, rootReducers);
const store = () =>
    configureStore({
        reducer: persistedReducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false,
            });
        },
    });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const persistor = persistStore(store());
export default store;
