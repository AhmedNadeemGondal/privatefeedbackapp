import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be 10 characters")
    .max(300, "Content must be between 10 and 300 characters"),
});
