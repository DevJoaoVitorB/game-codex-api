import z from 'zod';

export const GenreSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(50, 'Name must be less than 50 characters'),
    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .max(50, 'Slug must be less than 50 characters'),
});

export type GenreDTO = z.infer<typeof GenreSchema>;
