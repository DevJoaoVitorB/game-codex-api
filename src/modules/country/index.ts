import { prisma } from '@/lib/prisma';
import { CountryRepository } from './country.repository';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

export * from './country.schema';

export const repository = new CountryRepository(prisma);
export const service = new CountryService(repository);
export const controller = new CountryController(service);
