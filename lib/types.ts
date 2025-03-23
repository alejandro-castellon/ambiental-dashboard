export interface MapPoint {
  id: number;
  position: [number, number]; // [latitud, longitud]
  title: string;
  image: string;
}

export interface SensorData {
  id: string;
  date: string;
  time: string;
  temperature: number;
  ph: number;
  conductivity: number;
  oxygen: number;
  solid: number;
  dbo5: number;
  nitrogen: number;
  phosphorus: number;
}

export interface ChartData {
  date: string;
  ph: number;
  temperature: number;
  conductivity: number;
}
