import { prisma } from '@/lib/prisma';
import { PlatformRepository } from './platform.repository';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';

export * from './platform.schema';

export const repository = new PlatformRepository(prisma);
export const service = new PlatformService(repository);
export const controller = new PlatformController(service);
