import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import { Person } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { signOut } from '@/apis/auth/sign-out';
import { useAppDispatch } from '@/lib/hooks/use-app-dispatch';
import { setAuthState } from '@/store/slices/auth-slice';

export default function ProfileButton() {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = async () => {
        try {
            await signOut()
            dispatch(setAuthState({
                isAuthenticated: true,
                user: {
                    name: null,
                    email: null,
                    id: null,
                },
                token: null
            }))
        } catch (error) {
            console.error(error);
        } finally {
            handleClose();
        }
    };
    return (
        <React.Fragment>
            <Button
                onClick={handleClick}
                size="small"
                variant='outlined'
            >
                <Person /> <Typography variant='inherit' sx={{ mt: '4px', mx: '8px' }}>Profile</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        variant: 'outlined',
                        elevation: 0,
                        sx: {
                            my: '4px',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleSignOut}>
                    Sign Out
                </MenuItem>
            </Menu>
        </React.Fragment>

    )
}
