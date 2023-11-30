import { Controller, Get } from '@nestjs/common';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get('/temperature/12_hours')
  async getTemperatureReadingsBy12Hours() {
    return this.readingsService.findBySensorAndTimeType(
      '12hours',
      'temperature',
    );
  }

  @Get('/temperature/hour')
  async getTemperatureReadingsByhour() {
    return this.readingsService.findBySensorAndTimeType('hour', 'temperature');
  }

  @Get('/temperature/day')
  async getTemperatureReadingsByDay() {
    return this.readingsService.findBySensorAndTimeType('day', 'temperature');
  }

  @Get('/temperature/minute')
  async getTemperatureReadingsByMinute() {
    return this.readingsService.findBySensorAndTimeType(
      'minute',
      'temperature',
    );
  }

  @Get('/luminosity/12_hours')
  async getLuminosityReadingsBy12Hours() {
    return this.readingsService.findBySensorAndTimeType(
      '12hours',
      'luminosity',
    );
  }

  @Get('/luminosity/hour')
  async getLuminosityReadingsByhour() {
    return this.readingsService.findBySensorAndTimeType('hour', 'luminosity');
  }

  @Get('/luminosity/day')
  async getLuminosityReadingsByDay() {
    return this.readingsService.findBySensorAndTimeType('day', 'luminosity');
  }

  @Get('/luminosity/minute')
  async getLuminosityReadingsByMinute() {
    return this.readingsService.findBySensorAndTimeType('minute', 'luminosity');
  }

  @Get('/soil-moisture/12_hours')
  async getSoilMoistureReadingsBy12Hours() {
    return this.readingsService.findBySensorAndTimeType(
      '12hours',
      'soil-moisture',
    );
  }

  @Get('/soil-moisture/hour')
  async getSoilMoistureReadingsByhour() {
    return this.readingsService.findBySensorAndTimeType(
      'hour',
      'soil-moisture',
    );
  }

  @Get('/soil-moisture/day')
  async getSoilMoistureReadingsByDay() {
    return this.readingsService.findBySensorAndTimeType('day', 'soil-moisture');
  }

  @Get('/soil-moisture/minute')
  async getSoilMoistureReadingsByMinute() {
    return this.readingsService.findBySensorAndTimeType(
      'minute',
      'soil-moisture',
    );
  }

  @Get('/air-moisture/12_hours')
  async getAirMoistureReadingsBy12Hours() {
    return this.readingsService.findBySensorAndTimeType(
      '12hours',
      'air-moisture',
    );
  }

  @Get('/air-moisture/hour')
  async getAirMoistureReadingsByhour() {
    return this.readingsService.findBySensorAndTimeType('hour', 'air-moisture');
  }

  @Get('/air-moisture/day')
  async getAirMoistureReadingsByDay() {
    return this.readingsService.findBySensorAndTimeType('day', 'air-moisture');
  }

  @Get('/air-moisture/minute')
  async getAirMoistureReadingsByMinute() {
    return this.readingsService.findBySensorAndTimeType(
      'minute',
      'air-moisture',
    );
  }
}
