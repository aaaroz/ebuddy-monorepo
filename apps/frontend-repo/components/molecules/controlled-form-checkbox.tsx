import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import React from 'react'
import { Control, Controller, Path } from 'react-hook-form'

interface ControlledFormCheckboxProps<T> {
    control: Control<T>
    errors: Partial<Record<Path<T>, { message?: string }>>
    name: Path<T>
    label?: string
}

export default function ControlledFormCheckbox<T>({ control, name, errors, label = 'Check me!' }: ControlledFormCheckboxProps<T>) {
    return (
        <FormControl
            error={!!errors[name]}
            component="fieldset"
            variant="standard"
        >
            <FormControlLabel
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                color="primary"
                                checked={field.value as boolean}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                        )}
                    />
                }
                label={label}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    )
}
