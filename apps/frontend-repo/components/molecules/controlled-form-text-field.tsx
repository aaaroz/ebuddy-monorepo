import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import React, { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, Path } from 'react-hook-form'

interface ControlledFormTextFieldProps<T> {
    control: Control<T>
    errors: Partial<Record<Path<T>, { message?: string }>>
    name: Path<T>
    label?: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    autoComplete?: string
}

export default function ControlledFormTextField<T>({
    control,
    errors,
    name,
    label,
    type = 'text',
    placeholder = 'Write something...',
    autoComplete = 'name'
}: ControlledFormTextFieldProps<T>) {
    return (
        <FormControl>
            <FormLabel htmlFor={name as string}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        autoComplete={autoComplete}
                        required
                        fullWidth
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        color={errors[name] ? 'error' : 'primary'}
                    />
                )}
            />
        </FormControl>

    )
}

