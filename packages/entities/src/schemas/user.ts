import { z } from "zod";

const userSchema = z.object({
    id: z.string({
        required_error: "ID is required",
        invalid_type_error: "ID must be a string",
    }),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email("Invalid email format"),
    totalAverageWeightRatings: z.coerce
        .number({
            invalid_type_error: "Total average weight ratings must be a number",
        })
        .optional(),
    numberOfRents: z.coerce
        .number({
            invalid_type_error: "Number of rents must be a number",
        })
        .optional(),
    recentlyActive: z.coerce
        .number({
            invalid_type_error: "Recently active must be a number",
        })
        .optional(),
    priorityScore: z
        .number({
            invalid_type_error: "Priority score must be a number",
        })
        .optional(),
});

type TUser = z.infer<typeof userSchema>;

export { userSchema, type TUser };
