import { Injectable } from '@nestjs/common';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sensor } from 'src/websockets/entity/sensor';

@Injectable()
export class ReadingsService {
  private lastHourlySave: Date = new Date();
  private lastMinuteSave: Date = new Date();
  private last12HoursSave: Date = new Date();
  private lastDaySave: Date = new Date();

  constructor(private readonly prismaService: PrismaService) {}

  async handleData(sensor: Sensor) {
    const currentTime = new Date();

    if (this.hasOneMinutePassed(this.lastMinuteSave, currentTime)) {
      await this.saveData(sensor, 'minute');
      this.lastMinuteSave = currentTime;
    }

    if (this.hasOneHourPassed(this.lastHourlySave, currentTime)) {
      await this.saveData(sensor, 'hour');
      this.lastHourlySave = currentTime;
    }

    if (this.hasTwelveHoursPassed(this.last12HoursSave, currentTime)) {
      await this.saveData(sensor, '12hours');
      this.last12HoursSave = currentTime;
    }

    if (this.hasOneDayPassed(this.lastDaySave, currentTime)) {
      await this.saveData(sensor, 'day');
      this.lastDaySave = currentTime;
    }
  }

  private hasOneHourPassed(lastSaveTime: Date, currentTime: Date): boolean {
    return this.getTimeDifferenceInHours(lastSaveTime, currentTime) >= 1;
  }

  private hasTwelveHoursPassed(lastSaveTime: Date, currentTime: Date): boolean {
    return this.getTimeDifferenceInHours(lastSaveTime, currentTime) >= 12;
  }

  private hasOneMinutePassed(lastSaveTime: Date, currentTime: Date): boolean {
    return this.getTimeDifferenceInMinutes(lastSaveTime, currentTime) >= 1;
  }

  private hasOneDayPassed(lastSaveTime: Date, currentTime: Date): boolean {
    return this.getTimeDifferenceInHours(lastSaveTime, currentTime) >= 24;
  }

  private getTimeDifferenceInMinutes(time1: Date, time2: Date): number {
    const differenceInMs = time2.getTime() - time1.getTime();
    return differenceInMs / (1000 * 60);
  }

  private getTimeDifferenceInHours(time1: Date, time2: Date): number {
    const differenceInMs = time2.getTime() - time1.getTime();
    return differenceInMs / (1000 * 60 * 60);
  }

  private async saveData(sensor: Sensor, time_type: string) {
    try {
      await this.prismaService.reading.create({
        data: {
          sensor: Object.keys(sensor)[0],
          value: Object.values(sensor)[0],
          time_type,
        },
      });
    } catch (error) {
      console.error('Erro ao salvar dados no banco de dados:', error);
    }
  }

  findAll() {
    return this.prismaService.reading.findMany();
  }

  findBySensorAndTimeType(time_type: string, sensor: string) {
    return this.prismaService.reading.findMany({
      where: { time_type, sensor },
    });
  }

  findOne(id: number) {
    return this.prismaService.reading.findUnique({ where: { id } });
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return this.prismaService.reading.update({
      where: { id },
      data: updateReadingDto,
    });
  }

  remove(id: number) {
    return this.prismaService.reading.delete({ where: { id } });
  }
}
