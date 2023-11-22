
import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string().optional(),
    categoryId: z.number().optional(),
    date: z.any().optional(), 
});
