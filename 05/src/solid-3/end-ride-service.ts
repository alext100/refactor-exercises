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

export interface RideRepository {
  findById(id: string): Promise<Ride>;
  save(ride: Ride): Promise<void>;
}

export interface PaymentGateway {
  charge(userId: string, amount: number): Promise<boolean>;
}

export interface VehicleLocker {
  lock(vehicleId: string): Promise<void>;
}

export interface Notifier {
  send(userId: string, message: string): Promise<void>;
}

export interface AuditTrail {
  log(ride: Ride): Promise<void>;
}

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

export class PaymentService implements PaymentGateway {
  async charge(userId: string, amount: number): Promise<boolean> {
    console.log(`Charging user ${userId}: €${amount}`);
    return true;
  }
}

export class VehicleIoTService implements VehicleLocker {
  async lock(vehicleId: string): Promise<void> {
    console.log(`Locking vehicle ${vehicleId}`);
  }
}

export class NotificationService implements Notifier {
  async send(userId: string, message: string): Promise<void> {
    console.log(`Notifying user ${userId}: ${message}`);
  }
}

export class AuditLogger implements AuditTrail {
  async log(ride: Ride): Promise<void> {
    console.log(`Auditing ride ${ride.id}`);
  }
}

export class EndRideService {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly vehicleLocker: VehicleLocker,
    private readonly notifier: Notifier,
    private readonly auditTrail: AuditTrail,
    private readonly fareCalculators: FareCalculator[]
  ) {}

  async execute(rideId: string): Promise<void> {
    // 1. Find ride by ID
    const ride = await this.rideRepository.findById(rideId);

    // 2. Calculate amount based on vehicle type
    const calculator = this.fareCalculators.find((c) =>
      c.supports(ride.vehicleType)
    );

    if (!calculator) {
      throw new Error("Unsupported vehicle type");
    }

    const totalCost = calculator.calculate(ride);

    // 3. Execute payment
    const payment = await this.paymentGateway.charge(ride.userId, totalCost);

    if (!payment) {
      throw new Error("Payment failed");
    }

    // 4. Lock vehicle
    await this.vehicleLocker.lock(ride.vehicleId);

    // 5. Update status and persist
    ride.status = "FINISHED";
    ride.totalCost = totalCost;
    await this.rideRepository.save(ride);

    // 6. Send notification
    await this.notifier.send(
      ride.userId,
      `Your ride has ended. Total cost: €${totalCost}`
    );

    // 7. Audit logging
    await this.auditTrail.log(ride);
  }
}

/* Usage Example */
const endRideService = new EndRideService(
  new RideApiRepository(),
  new PaymentService(),
  new VehicleIoTService(),
  new NotificationService(),
  new AuditLogger(),
  [new CarFareCalculator(), new MotoFareCalculator(), new BikeFareCalculator()]
);

await endRideService.execute("ride-123");
