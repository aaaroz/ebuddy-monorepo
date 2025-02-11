import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "@/apis/user/fetch-all-users";
import { TUser } from "entities";

export const fetchPaginatedUsersThunk = createAsyncThunk(
    "fetch-paginated-users",
    async (
        { limit = 5, lastUserId }: { limit?: number; lastUserId?: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await fetchAllUsers(limit, lastUserId);
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message || "Unknown error");
        }
    },
);

export interface PaginatedUsersState {
    users: TUser[];
    lastUserId: string | null;
    status: "idle" | "pending" | "success" | "error";
    message: string;
}

const initialState: PaginatedUsersState = {
    users: [],
    lastUserId: null,
    status: "idle",
    message: "",
};

const paginatedUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedUsersThunk.fulfilled, (state, action) => {
                const newUsers = action.payload.data;
                const uniqueUsers = newUsers.filter(newUser =>
                    !state.users.some(existingUser => existingUser.id === newUser.id)
                );
                state.status = "success";
                state.users = [...state.users, ...uniqueUsers];
                state.lastUserId = action.payload.lastUserId || null;
                state.message = action.payload.message || "Users fetched successfully";
            })
            .addCase(fetchPaginatedUsersThunk.rejected, (state, action) => {
                state.status = "error";
                state.message = (action.payload as string) || "Failed to fetch users";
            })
            .addCase(fetchPaginatedUsersThunk.pending, (state) => {
                state.status = "pending";
                state.message = "Fetching users...";
            });
    },
});

export default paginatedUsersSlice.reducer;
