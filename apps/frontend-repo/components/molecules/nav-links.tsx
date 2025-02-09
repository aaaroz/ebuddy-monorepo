import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'

const links = [
    {
        title: "Features",
        href: "#"
    },
    {
        title: "Testimonials",
        href: "#"
    },
    {
        title: "Highlights",
        href: "#"
    },
    {
        title: "Pricing",
        href: "#"
    },
    {
        title: "FAQ",
        href: "#"
    },
    {
        title: "Blog",
        href: "#"
    },
]
interface NavLinksProps {
    isMenuItem?: boolean
    isFooterItem?: boolean
}
export default function NavLinks({ isMenuItem = false, isFooterItem = false }: NavLinksProps) {
    const Comp: React.ElementType = isMenuItem ? MenuItem : isFooterItem ? Link : Button
    return (
        <>
            {links.map((link) => (
                <Comp key={link.title} variant={isFooterItem ? "body2" : "text"} color={isFooterItem ? "text.secondary" : "info"} size="small" href={link.href}>
                    {link.title}
                </Comp>
            ))}
        </>
    )
}

