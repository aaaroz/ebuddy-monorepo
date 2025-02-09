import Box from '@mui/material/Box'
import React, { ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface AuthFormProps<T extends FieldValues> {
    children: ReactNode;
    form: UseFormReturn<T>;
    onSubmit: (value: T) => Promise<void>
}

export default function AuthForm<T extends FieldValues>({ children, form, onSubmit }: AuthFormProps<T>) {
    return (
        <Box
            component="form"
            onSubmit={form.handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {children}
        </Box>
    )
}

