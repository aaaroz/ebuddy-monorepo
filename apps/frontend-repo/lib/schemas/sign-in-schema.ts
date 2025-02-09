import { z } from "zod";

const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    showPassword: z.boolean()
});

type TSignInSchema = z.infer<typeof signInSchema>;

export { signInSchema, type TSignInSchema }
