import z from 'zod';

export const Continent = z.enum([
    'AFRICA',
    'EUROPE',
    'ASIA',
    'OCEANIA',
    'ANTARCTICA',
    'NORTH_AMERICA',
    'SOUTH_AMERICA',
]);

export const CountrySchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(255, 'Name must be less than 255 characters'),
    code: z.string().trim().length(2, 'Code must be exactly 2 characters'),
    continent: Continent,
});

export const CountrySearchFiltersSchema = z.object({
    continent: z.array(Continent).optional(),
});

export type CountryDTO = z.infer<typeof CountrySchema>;
export type CountrySearchFiltersDTO = z.infer<typeof CountrySearchFiltersSchema>;
