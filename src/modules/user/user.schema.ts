//ZOD input validation

import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const updateProfileSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(2).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const loginSchema = registerSchema;
