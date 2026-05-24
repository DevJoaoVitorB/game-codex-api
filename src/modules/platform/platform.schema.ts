import z from 'zod';

export const PlatformType = z.enum(['PC', 'CONSOLE', 'MOBILE']);

export const PlatformSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters'),
    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .max(50, 'Slug must be less than 50 characters'),
    type: PlatformType,
});

export const PlatformSearchFiltersSchema = z.object({
    type: z.array(PlatformType).optional(),
});

export type PlatformDTO = z.infer<typeof PlatformSchema>;
export type PlatformSearchFiltersDTO = z.infer<typeof PlatformSearchFiltersSchema>;
