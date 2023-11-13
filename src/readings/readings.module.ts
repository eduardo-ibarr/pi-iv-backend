import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ReadingsService, PrismaService],
})
export class ReadingsModule {}
