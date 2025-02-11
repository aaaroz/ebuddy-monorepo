import * as React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { TUser } from "entities";

interface UserCardProps {
    user: TUser;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <Card
            sx={{
                minWidth: 275,
                maxWidth: 600,
                margin: "16px",
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Email: {user.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {user.totalAverageWeightRatings !== undefined && (
                        <Typography variant="body2">
                            Average Weight Ratings:{" "}
                            <strong>{user.totalAverageWeightRatings.toFixed(2)}</strong>
                        </Typography>
                    )}
                    {user.numberOfRents !== undefined && (
                        <Typography variant="body2">
                            Number of Rents: <strong>{user.numberOfRents}</strong>
                        </Typography>
                    )}
                    {user.recentlyActive !== undefined && (
                        <Typography variant="body2">
                            Recently Active:{" "}
                            <strong>{new Date(user?.recentlyActive).toISOString()}</strong>
                        </Typography>
                    )}
                    {user.priorityScore !== undefined && (
                        <Typography variant="body2">
                            Priority Score: <strong>{user.priorityScore}</strong>
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
