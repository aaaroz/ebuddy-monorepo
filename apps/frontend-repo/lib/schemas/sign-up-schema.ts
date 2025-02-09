import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    showPassword: z.boolean()
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

export { signUpSchema, type TSignUpSchema }
