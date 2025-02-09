import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import visuallyHidden from '@mui/utils/visuallyHidden';
import React from 'react'

interface EmailInputProps {
    isFooterComponent?: boolean
}


export default function EmailInput({ isFooterComponent = false }: EmailInputProps) {
    return (
        <Stack
            direction={isFooterComponent ? 'row' : { xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={isFooterComponent ? {} : { pt: 2, width: { xs: '100%', sm: '350px' } }}
        >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
                Email
            </InputLabel>
            <TextField
                id="email-hero"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Enter your email address"
                placeholder="Your email address"
                fullWidth
                slotProps={{
                    htmlInput: {
                        autoComplete: 'off',
                        'aria-label': 'Enter your email address',
                    },
                }}
                sx={isFooterComponent ? { width: '250px' } : {}}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={isFooterComponent ? { flexShrink: 0 } : { minWidth: 'fit-content' }}
            >
                {isFooterComponent ? 'Subscribe' : 'Start now'}
            </Button>
        </Stack>
    )
}

