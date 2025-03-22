export interface MapPoint {
  id: number;
  position: [number, number]; // [latitud, longitud]
  title: string;
  image: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}
