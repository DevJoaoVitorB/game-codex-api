import z from 'zod';

const currentYear = new Date().getFullYear();

export const FoundedYearSchema = z.coerce
    .number()
    .int('Founded year must be an integer')
    .min(1000, 'Founded year must be a 4-digit year')
    .max(currentYear, 'Founded year cannot be in the future');

export const GameStudioSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(150, 'Name must be less than 150 characters'),
    website: z
        .string()
        .trim()
        .min(1, 'Website must be at least 1 character')
        .max(255, 'Website must be less than 255 characters')
        .nullable()
        .optional(),
    foundedYear: FoundedYearSchema,
    countryId: z.coerce.number().int(),
});

export const GameStudioCreateSchema = GameStudioSchema.omit({ id: true });

export const GameStudioUpdateSchema = GameStudioCreateSchema.partial();

export const GameStudioSearchFiltersSchema = z.object({
    foundedYear: z.array(FoundedYearSchema).optional(),
    countryId: z.array(z.coerce.number().int()).optional(),
});

export type GameStudioDTO = z.infer<typeof GameStudioSchema>;
export type GameStudioCreateDTO = z.infer<typeof GameStudioCreateSchema>;
export type GameStudioUpdateDTO = z.infer<typeof GameStudioUpdateSchema>;
export type GameStudioSearchFiltersDTO = z.infer<
    typeof GameStudioSearchFiltersSchema
>;
