import * as React from "react";
import { Box, Typography } from "@mui/material";
import UserCard from "../molecules/user-card";
import { TUser } from "entities";

interface UserListProps {
    users: TUser[];
}

export default function UserList({ users }: UserListProps) {
    return (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {users.length > 0 ? (
                users.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
                <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                    textAlign="center"
                >
                    No users found.
                </Typography>
            )}
        </Box>
    );
}
