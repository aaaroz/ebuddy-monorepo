import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import ControlledFormTextField from "../molecules/controlled-form-text-field";
import { UseFormReturn } from "react-hook-form";
import { TUser } from "entities";

type ProfileFormsProps = {
  form: UseFormReturn<TUser>;
  disabled?: boolean;
};

export default function ProfileForms({
  form,
  disabled = false,
}: ProfileFormsProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        width: { md: "50%" },
      }}
    >
      <Typography variant="h4" align="left" gutterBottom>
        My Detail
      </Typography>
      <ControlledFormTextField
        name="id"
        control={form.control}
        errors={form.formState.errors}
        label="User ID"
        placeholder="xxuid"
        readOnly
      />
      <ControlledFormTextField
        name="name"
        control={form.control}
        errors={form.formState.errors}
        label="Name"
        placeholder="Your full name"
      />
      <ControlledFormTextField
        name="email"
        control={form.control}
        errors={form.formState.errors}
        label="Email"
        placeholder="Your email"
        readOnly
      />
    </Stack>
  );
}
