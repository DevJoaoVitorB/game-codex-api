import z from 'zod';

export const CountrySchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(255, 'Name must be less than 255 characters'),
    code: z.string().trim().length(2, 'Code must be exactly 2 characters'),
    continent: z.enum([
        'AFRICA',
        'EUROPE',
        'ASIA',
        'OCEANIA',
        'ANTARCTICA',
        'NORTH_AMERICA',
        'SOUTH_AMERICA',
    ]),
});

export const CountryCreateSchema = CountrySchema.omit({ id: true });
export const CountryUpdateSchema = CountryCreateSchema.partial();

export const CountryUniqueFieldsSchema = CountryUpdateSchema.omit({
    continent: true,
});

export const CountrySearchFiltersSchema = CountryUpdateSchema.pick({
    continent: true,
});

export type CountryDTO = z.infer<typeof CountrySchema>;
export type CountryCreateDTO = z.infer<typeof CountryCreateSchema>;
export type CountryUpdateDTO = z.infer<typeof CountryUpdateSchema>;
export type CountryUniqueFieldsDTO = z.infer<typeof CountryUniqueFieldsSchema>;
export type CountrySearchFiltersDTO = z.infer<typeof CountrySearchFiltersSchema>;
