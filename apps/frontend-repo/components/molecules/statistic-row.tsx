import React from "react";
import { Stack, Skeleton, Typography } from "@mui/material";

type StatisticRowProps = {
  label: string;
  value?: string | number;
  isLoading?: boolean;
};

export default function StatisticRow({
  label,
  value,
  isLoading = false,
}: StatisticRowProps) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="subtitle1" color="text.secondary">
        {label}
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" sx={{ width: "30%", fontSize: "1.5rem" }} />
      ) : (
        <Typography variant="body1">{value}</Typography>
      )}
    </Stack>
  );
}
