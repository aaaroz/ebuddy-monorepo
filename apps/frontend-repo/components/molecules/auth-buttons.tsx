import React, { Fragment } from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'

interface AuthButtonsProps {
    isMenuItem?: boolean
}
const authentications = [
    {
        title: 'Sign in',
        href: 'sign-in'
    },
    {
        title: 'Sign up',
        href: 'sign-up'
    }
]

export default function AuthButtons({ isMenuItem }: AuthButtonsProps) {
    const Component = isMenuItem ? MenuItem : Fragment
    return (
        <>
            {authentications.map(item => (
                <Link key={item.href} href={item.href}>
                    <Component>
                        <Button color="primary" variant={item.href === 'sign-up' ? 'contained' : 'text'} size="small" fullWidth={isMenuItem}>
                            {item.title}
                        </Button>
                    </Component>
                </Link>
            ))}
        </>
    )
}

