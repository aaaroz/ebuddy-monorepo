'use client';
import React from 'react';
import { Box, Card, CardContent, Typography, Stack, Divider, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TUser } from 'entities';
import AppBar from '../organisms/app-bar';

interface ProfilePageProps {
    user?: TUser;
}

const mockUser: TUser = {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    totalAverageWeightRatings: 4.7,
    numberOfRents: 30,
    recentlyActive: 5,
};

export default function ProfilePage({ user = mockUser }: ProfilePageProps) {
    const theme = useTheme();

    return (
        <>
            <AppBar />
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
                    ...theme.applyStyles('dark', {
                        backgroundImage:
                            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
                    }),
                })}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Card
                        sx={{
                            width: '100%',
                            boxShadow: theme.shadows[3],
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: 3,
                                '&:last-child': {
                                    paddingBottom: 3,
                                },
                            }}
                        >
                            <Typography variant="h4" align="center" gutterBottom>
                                My Detail
                            </Typography>

                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle1" color="text.secondary">
                                        ID:
                                    </Typography>
                                    <Typography variant="body1">{user.id}</Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Name:
                                    </Typography>
                                    <Typography variant="body1">{user.name}</Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Email:
                                    </Typography>
                                    <Typography variant="body1">{user.email}</Typography>
                                </Stack>

                                {user.totalAverageWeightRatings !== undefined && (
                                    <>
                                        <Divider />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="subtitle1" color="text.secondary">
                                                Average Rating:
                                            </Typography>
                                            <Typography variant="body1">
                                                {user.totalAverageWeightRatings.toFixed(1)}
                                            </Typography>
                                        </Stack>
                                    </>
                                )}

                                {user.numberOfRents !== undefined && (
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Number of Rents:
                                        </Typography>
                                        <Typography variant="body1">{user.numberOfRents}</Typography>
                                    </Stack>
                                )}

                                {user.recentlyActive !== undefined && (
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Recently Active (days ago):
                                        </Typography>
                                        <Typography variant="body1">{user.recentlyActive}</Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
}
