import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Person } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { signOut } from "@/apis/auth/sign-out";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { setAuthState } from "@/store/slices/auth-slice";
import { useRouter } from "next/navigation";

interface ProfileButtonProps {
  isMenuItem?: boolean;
}
export default function ProfileButton({
  isMenuItem = false,
}: ProfileButtonProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authState = useAppSelector((state) => state.authReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = () => {
    router.push("/profile");
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(
        setAuthState({
          isAuthenticated: false,
          user: {
            name: null,
            email: null,
            id: null,
          },
          token: null,
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };
  if (isMenuItem) {
    return (
      <>
        <MenuItem>
          <Button
            onClick={handleNavigate}
            color="primary"
            variant="contained"
            size="small"
            fullWidth={isMenuItem}
          >
            My Profile
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={handleSignOut}
            color="primary"
            variant="outlined"
            size="small"
            fullWidth={isMenuItem}
          >
            Sign Out
          </Button>
        </MenuItem>
      </>
    );
  }
  return (
    <React.Fragment>
      <Button onClick={handleClick} size="small" variant="outlined">
        <Person />{" "}
        <Typography variant="inherit" sx={{ mt: "4px", mx: "8px" }}>
          {authState.user.name ?? "logged in"}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleNavigate}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
