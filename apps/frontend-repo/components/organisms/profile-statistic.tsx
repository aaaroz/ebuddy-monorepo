import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import StatisticRow from "../molecules/statistic-row";
import { TUser } from "entities";
import { UseFormReturn } from "react-hook-form";
import ControlledFormTextField from "../molecules/controlled-form-text-field";
import { calculatePriorityScore } from "@/lib/utils/calculate-priority-score";

type ProfileStatisticsProps = {
    form: UseFormReturn<TUser>;
    isLoading?: boolean;
};

export default function ProfileStatistics({
    form,
    isLoading = false,
}: ProfileStatisticsProps) {
    return (
        <Stack
            spacing={2}
            sx={{
                width: { md: "50%" },
            }}
        >
            <Typography variant="h4" align="left" gutterBottom>
                My Statistics
            </Typography>
            <ControlledFormTextField
                name="totalAverageWeightRatings"
                control={form.control}
                errors={form.formState.errors}
                label="Average Rating"
                placeholder="0.00"
                type='number'
            />
            <ControlledFormTextField
                name="numberOfRents"
                control={form.control}
                errors={form.formState.errors}
                label="Number of Rents"
                placeholder="0"
                type='number'
            />
            <ControlledFormTextField
                name="recentlyActive"
                control={form.control}
                errors={form.formState.errors}
                label="Recently Active"
                placeholder="0.00"
                type='number'
            />
            <StatisticRow
                label="Priority Score:"
                value={
                    calculatePriorityScore(
                        form.watch("totalAverageWeightRatings"),
                        form.watch("numberOfRents"),
                        form.watch("recentlyActive"),
                    ) ?? 0
                }
                isLoading={isLoading}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
                Update
            </Button>
        </Stack>
    );
}
