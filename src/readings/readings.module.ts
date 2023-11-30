import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadingsController } from './readings.controller';

@Module({
  providers: [ReadingsService, PrismaService],
  controllers: [ReadingsController],
})
export class ReadingsModule {}
