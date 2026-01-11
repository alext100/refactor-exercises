export type VehicleType = "CAR" | "MOTO" | "BIKE";
export type RideStatus = "ACTIVE" | "FINISHED";

export type Ride = {
  id: string;
  vehicleId: string;
  vehicleType: VehicleType;
  userId: string;
  minutes: number;
  distanceKm: number;
  status: RideStatus;
  totalCost?: number;
};
