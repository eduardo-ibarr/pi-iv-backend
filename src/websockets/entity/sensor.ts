export interface Sensor {
  id: string;
  name: string;
  date: Date;
  value: {
    [key: string]: number;
  };
}
