import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

interface EbuddyLogoProps {
    size?: "sm" | "default";
}

export default function EbuddyLogo({ size = "default" }: EbuddyLogoProps) {
    return (
        <Link href="/" passHref>
            <Typography
                variant={size === "default" ? "h4" : "h6"}
                color="textPrimary"
            >
                eBuddy
            </Typography>
        </Link>
    );
}
