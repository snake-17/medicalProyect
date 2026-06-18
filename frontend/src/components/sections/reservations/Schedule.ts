export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  available?: boolean; // El signo de interrogación significa que es opcional
}
