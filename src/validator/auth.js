import { z } from "zod";

export const signupSchema = z.object({
  user_email: z.string().email("Please enter a valid email"),
  user_password: z.string().min(1, "Please provide your password.").max(255),
  user_display_name: z
    .string()
    .min(1, "Please provide your display name.")
    .max(255),
  user_name: z.string().min(1, "Please provide your name.").max(255),
  user_role:z.string().min(1, "Please provide your user role.").max(255),
});

export const loginSchema = z.object({
  user_email: z.string().email("Please enter a valid email."),
  user_password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
});

export const forgotPasswordSchema = z.object({
  user_email: z.string().email(),
});
export const newPasswordSchema = z.object({
  new_password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
  user_otp: z.string().min(1, "Please provide your otp.").max(4),
  user_email: z.string().email("Please enter a valid email"),
});

export const verifyOtpSchema = z.object({
  user_email: z.string().email("Please enter a valid email"),
  user_otp: z.string().min(1, "Please provide your password.").max(255),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid token"),
  password: z.string().min(8, "Password is too short").max(255),
});


export const subCategorySchema = z.object({
  sub_category: z.string().min(1, "Please enter sub category"),
  sub_category_relation_id: z.string().min(1),
  sub_category_type: z.string().min(1, "Please enter sub category type").max(255),
});