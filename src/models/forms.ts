import { ZodType, z } from "zod";
export type RegisterSchema = {
  username: string;
  email: string;
  password: string;
};
export type LoginSchema = {
  email: string;
  password: string;
};

export const formReg: ZodType<RegisterSchema> = z.object({
  username: z
    .string()
    .min(5, "username must contain at least 5 characters")
    .max(10, "username must contain at most 10 characters"),
  email: z.string().email().min(1),
  password: z.string().min(6, "password must contain at least 6 characters"),
});
export const formLog: ZodType<LoginSchema> = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6, "password must contain at least 6 characters"),
});
