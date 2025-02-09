import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="#">
                eBuddy
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

