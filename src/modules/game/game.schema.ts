import z from 'zod';

export const ClassificationSchema = z.enum([
    'L',
    'TEN',
    'TWELVE',
    'FOURTEEN',
    'SIXTEEN',
    'EIGHTEEN',
]);

export const PlatformTypeSchema = z.enum(['PC', 'CONSOLE', 'MOBILE']);

const classifications = {
    '10': 'TEN',
    '12': 'TWELVE',
    '14': 'FOURTEEN',
    '16': 'SIXTEEN',
    '18': 'EIGHTEEN',
} as const;

export const ClassificationInputSchema = z
    .string()
    .trim()
    .transform((value, context) => {
        const classification =
            classifications[value as keyof typeof classifications] ??
            value.toUpperCase();
        const result = ClassificationSchema.safeParse(classification);

        if (!result.success) {
            context.addIssue({
                code: 'custom',
                message: 'Invalid classification',
            });
            return z.NEVER;
        }

        return result.data;
    });

const GameFieldsSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    slug: z.string().trim().min(1, 'Slug is required').max(50),
    description: z.string().trim().min(1, 'Description is required'),
    classification: ClassificationInputSchema,
    releaseDate: z.coerce.date(),
    specs: z.json().nullable().optional(),
    studioId: z.coerce.number().int().positive(),
    platformIds: z.array(z.coerce.number().int().positive()).min(1),
    genreIds: z.array(z.coerce.number().int().positive()).min(1),
});

export const GameCreateSchema = GameFieldsSchema;
export const GameUpdateSchema = GameFieldsSchema.partial();

export const GameSearchFiltersSchema = z.object({
    name: z.string().trim().min(1).optional(),
    genre: z.array(z.string().trim().min(1)).optional(),
    platform: z.array(z.string().trim().min(1)).optional(),
    type: z.array(PlatformTypeSchema).optional(),
    studio: z.array(z.string().trim().min(1)).optional(),
    classification: z.array(ClassificationInputSchema).optional(),
    releaseDate: z.array(z.coerce.date()).optional(),
});

export type GameCreateDTO = z.infer<typeof GameCreateSchema>;
export type GameUpdateDTO = z.infer<typeof GameUpdateSchema>;
export type GameSearchFiltersDTO = z.infer<typeof GameSearchFiltersSchema>;
