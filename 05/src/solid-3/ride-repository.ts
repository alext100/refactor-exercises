import { Ride } from "./types";

export interface RideRepository {
  findById(id: string): Promise<Ride>;
  save(ride: Ride): Promise<void>;
}

export class RideApiRepository implements RideRepository {
  async findById(id: string): Promise<Ride> {
    return {
      id,
      vehicleId: "vehicle-1",
      vehicleType: "CAR",
      userId: "user-1",
      minutes: 25,
      distanceKm: 12,
      status: "ACTIVE",
    };
  }

  async save(ride: Ride): Promise<void> {
    console.log("Saving ride", ride);
  }
}
