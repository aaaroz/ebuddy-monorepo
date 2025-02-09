'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import ControlledFormTextField from '../molecules/controlled-form-text-field';
import ControlledFormCheckbox from '../molecules/controlled-form-checkbox';
import AuthTemplate from '../templates/auth-template';
import AuthForm from '../organisms/auth-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, TSignInSchema } from '@/lib/schemas/sign-in-schema';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { signIn } from '@/apis/auth/sign-in';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch } from '@/lib/hooks/use-app-dispatch';
import { setAuthState } from '@/store/slices/auth-slice';

const snackbarInitState = {
    isOpen: false,
    message: ""
}
export default function SignIn() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [snackbarState, setSnackbarState] = React.useState(snackbarInitState)
    const form = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            showPassword: false,
        },
    });

    const onSubmit = async (data: TSignInSchema) => {
        const { ok, message, data: userData } = await signIn({ email: data.email, password: data.password })
        if (!ok) {
            setSnackbarState({ isOpen: true, message })
        }
        setSnackbarState({ isOpen: true, message })
        dispatch(setAuthState({
            isAuthenticated: true,
            user: {
                name: userData.name,
                email: userData.email,
                id: userData.id,
            },
            token: userData.token
        }))
        router.replace('/')

    };

    const handleClose = () => {
        setSnackbarState(snackbarInitState);
    };
    return (
        <AuthTemplate title='Sign In'>
            <AuthForm form={form} onSubmit={onSubmit}>
                <ControlledFormTextField name='email' control={form.control} errors={form.formState.errors} label='Email' placeholder='johndoe@example.com' />
                <ControlledFormTextField name='password' control={form.control} errors={form.formState.errors}
                    type={form.watch('showPassword') ? 'text' : 'password'}
                    label='Password'
                    placeholder='******'
                />
                <ControlledFormCheckbox name='showPassword' control={form.control} errors={form.formState.errors} label='Show password' />
                <Button type="submit" fullWidth variant="contained">
                    Sign in
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <Link
                        href="/sign-up"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Sign up here
                    </Link>
                </Typography>
            </AuthForm>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbarState.isOpen}
                onClose={handleClose}
                message={snackbarState.message}
            />
        </AuthTemplate>
    );
}
