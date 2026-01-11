import { Ride, VehicleType } from "./types";

export interface FareCalculator {
  supports(type: VehicleType): boolean;
  calculate(ride: Ride): number;
}

export class CarFareCalculator implements FareCalculator {
  supports(type: VehicleType) {
    return type === "CAR";
  }

  calculate(ride: Ride): number {
    return ride.minutes * 0.5 + ride.distanceKm * 0.2;
  }
}

export class MotoFareCalculator implements FareCalculator {
  supports(type: VehicleType) {
    return type === "MOTO";
  }

  calculate(ride: Ride): number {
    return ride.minutes * 0.3;
  }
}

export class BikeFareCalculator implements FareCalculator {
  supports(type: VehicleType) {
    return type === "BIKE";
  }

  calculate(ride: Ride): number {
    return ride.minutes * 0.1;
  }
}
