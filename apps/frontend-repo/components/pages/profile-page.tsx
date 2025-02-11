"use client";
import * as React from "react";
import ProfileTemplate from "../templates/profile-template";
import Snackbar from "@mui/material/Snackbar";
import { type TUser, userSchema } from "entities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import {
    fetchUserDataThunk,
    updateUserDataThunk,
} from "@/store/slices/user-data-slice";
import { useSnackbarState } from "@/lib/hooks/use-snackbar-state";
import { useRouter } from "next/navigation";
import { calculatePriorityScore } from "@/lib/utils/calculate-priority-score";

const initUser: TUser = {
    id: "",
    name: "",
    email: "",
    totalAverageWeightRatings: 0.0,
    numberOfRents: 0,
    recentlyActive: 0,
    priorityScore: 0,
};

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userDataState = useAppSelector((state) => state.userDataReducer);
    const authState = useAppSelector((state) => state.authReducer);

    const { snackbarState, setSnackbarState, snackbarInitState } =
        useSnackbarState();

    const form = useForm<TUser>({
        resolver: zodResolver(userSchema),
        defaultValues: initUser,
    });

    const onSubmit = async (data: TUser) => {
        dispatch(updateUserDataThunk({ ...data, priorityScore: calculatePriorityScore(data.totalAverageWeightRatings, data.numberOfRents, data.recentlyActive) }));
        setSnackbarState({ isOpen: true, message: "User updated successfully!" });
    };

    React.useEffect(() => {
        const initializeData = async () => {
            if (!authState.isAuthenticated) {
                return router.replace("/sign-in");
            }

            if (authState.user.id) {
                dispatch(fetchUserDataThunk(authState.user.id));
            }
        };

        initializeData();
    }, [authState.isAuthenticated, authState.user.id, dispatch, router]);

    React.useEffect(() => {
        if (userDataState.status === "success") {
            form.reset(userDataState.data);
        }
    }, [userDataState.status, userDataState.data, form]);

    const handleClose = () => {
        setSnackbarState(snackbarInitState);
    };

    return (
        <>
            <ProfileTemplate form={form} onSubmitAction={onSubmit} />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={snackbarState.isOpen}
                onClose={handleClose}
                message={snackbarState.message}
            />
        </>
    );
}
