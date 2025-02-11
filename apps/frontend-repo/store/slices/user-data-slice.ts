import { fetchUserData } from "@/apis/user/fetch-user-data";
import { updateUserData } from "@/apis/user/update-user-data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "entities";

export const fetchUserDataThunk = createAsyncThunk(
    "fetch-user-data",
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data } = await fetchUserData(userId);
            return data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error);
        }
    },
);

export const updateUserDataThunk = createAsyncThunk(
    "update-user-data",
    async (data: TUser, { rejectWithValue }) => {
        try {
            console.log(data);

            const { data: updatedUserData } = await updateUserData(data);
            return updatedUserData;
        } catch (error: unknown) {
            console.error(error);
            return rejectWithValue(error);
        }
    },
);

export interface UsersState {
    data: TUser | null;
    status: "idle" | "pending" | "success" | "error";
    message: string;
}

const initialState: UsersState = {
    data: null,
    status: "idle",
    message: "",
};

const userDataSlice = createSlice({
    name: "user-data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(fetchUserDataThunk.rejected, (state, { error }) => {
                state.status = "error";
                state.message = error.stack;
            })
            .addCase(fetchUserDataThunk.pending, (state) => {
                state.status = "pending";
                state.message = "";
            })
            .addCase(updateUserDataThunk.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(updateUserDataThunk.rejected, (state, { error }) => {
                state.status = "error";
                state.message = error.stack;
            })
            .addCase(updateUserDataThunk.pending, (state) => {
                state.status = "pending";
                state.message = "";
            });
    },
});

export default userDataSlice.reducer;
