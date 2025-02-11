"use client";
import React from "react";
import FormWrapper from "../organisms/form-wrapper";
import AppBar from "../organisms/app-bar";
import ProfileStatistics from "../organisms/profile-statistic";
import ProfileForms from "../organisms/profile-forms";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserList from "../organisms/users-list";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Footer from "../organisms/footer";
import { TUser } from "entities";
import { UseFormReturn } from "react-hook-form";
import { fetchPaginatedUsersThunk } from "@/store/slices/users-slice";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";

interface ProfileTemplateProps {
  form: UseFormReturn<TUser>;
  onSubmitAction: (data: TUser) => Promise<void>;
}

export default function ProfileTemplate({
  form,
  onSubmitAction,
}: ProfileTemplateProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const userDataState = useAppSelector((state) => state.userDataReducer);
  const usersState = useAppSelector((state) => state.usersReducer);

  React.useEffect(() => {
    if (usersState.status === "idle") {
      dispatch(fetchPaginatedUsersThunk({ limit: 3 }));
    }
  }, [usersState, dispatch]);

  const handleFetchMoreUsers = () => {
    if (usersState.lastUserId) {
      dispatch(
        fetchPaginatedUsersThunk({
          limit: 3,
          lastUserId: usersState.lastUserId,
        }),
      );
    }
  };

  return (
    <>
      <AppBar />
      <Box
        sx={(theme) => ({
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
          }),
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Card
            sx={{
              width: "100%",
              boxShadow: theme.shadows[3],
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <FormWrapper form={form} onSubmit={onSubmitAction}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 8,
                  padding: 3,
                  "&:last-child": {
                    paddingBottom: 3,
                  },
                }}
              >
                <ProfileForms
                  form={form}
                  disabled={userDataState.status === "pending"}
                />
                <ProfileStatistics
                  form={form}
                  isLoading={userDataState.status === "pending"}
                />
              </CardContent>
            </FormWrapper>
          </Card>
          <Box sx={{ marginTop: "24px", padding: "24px", width: "100%" }}>
            <Typography variant="h4" align="left" gutterBottom>
              Other Users
            </Typography>
            <UserList users={usersState.users} />
            {usersState.lastUserId ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="text"
                  color="info"
                  onClick={handleFetchMoreUsers}
                  disabled={usersState.status === "pending"}
                >
                  {usersState.status === "pending"
                    ? "Loading..."
                    : "Fetch More Users"}
                </Button>
              </Box>
            ) : (
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                textAlign="center"
              >
                No more users found.
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
      <Divider />
      <Footer />
    </>
  );
}
