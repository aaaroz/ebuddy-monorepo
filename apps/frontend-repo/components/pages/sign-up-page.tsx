"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import ControlledFormTextField from "../molecules/controlled-form-text-field";
import ControlledFormCheckbox from "../molecules/controlled-form-checkbox";
import AuthTemplate from "../templates/auth-template";
import FormWrapper from "../organisms/form-wrapper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import { signUp } from "@/apis/auth/sign-up";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "@/lib/schemas/sign-up-schema";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { setAuthState } from "@/store/slices/auth-slice";
import { useSnackbarState } from "@/lib/hooks/use-snackbar-state";

export default function SignUp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.authReducer);
    const { snackbarState, setSnackbarState, snackbarInitState } =
        useSnackbarState();
    const form = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            showPassword: false,
        },
    });

    const onSubmit = async (data: TSignUpSchema) => {
        const {
            ok,
            message,
            data: userData,
        } = await signUp({
            email: data.email,
            password: data.password,
            name: data.name,
        });
        if (!ok) {
            setSnackbarState({ isOpen: true, message });
        }
        setSnackbarState({ isOpen: true, message });
        dispatch(
            setAuthState({
                isAuthenticated: true,
                user: {
                    name: userData.name,
                    email: userData.email,
                    id: userData.id,
                },
                token: userData.token,
            }),
        );
        router.replace("/");
    };

    const handleClose = () => {
        setSnackbarState(snackbarInitState);
    };

    React.useEffect(() => {
        if (authState.isAuthenticated) {
            router.replace("/profile");
        }
    }, [authState]);

    return (
        <AuthTemplate title="Sign Up">
            <FormWrapper form={form} onSubmit={onSubmit}>
                <ControlledFormTextField
                    name="name"
                    control={form.control}
                    errors={form.formState.errors}
                    label="Full name"
                    placeholder="John Doe"
                />
                <ControlledFormTextField
                    name="email"
                    control={form.control}
                    errors={form.formState.errors}
                    label="Email"
                    placeholder="johndoe@example.com"
                />
                <ControlledFormTextField
                    name="password"
                    control={form.control}
                    errors={form.formState.errors}
                    type={form.watch("showPassword") ? "text" : "password"}
                    label="Password"
                    placeholder="******"
                />
                <ControlledFormCheckbox
                    name="showPassword"
                    control={form.control}
                    errors={form.formState.errors}
                    label="Show password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={form.formState.isSubmitting}
                >
                    Sign up
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link href="/sign-in" variant="body2" sx={{ alignSelf: "center" }}>
                        Sign in here
                    </Link>
                </Typography>
            </FormWrapper>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={snackbarState.isOpen}
                onClose={handleClose}
                message={snackbarState.message}
            />
        </AuthTemplate>
    );
}
