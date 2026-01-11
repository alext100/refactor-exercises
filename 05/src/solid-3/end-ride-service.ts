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

export class RideApiRepository {
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

export class PaymentService {
  async charge(userId: string, amount: number): Promise<boolean> {
    console.log(`Charging user ${userId}: €${amount}`);
    return true;
  }
}

export class VehicleIoTService {
  async lock(vehicleId: string): Promise<void> {
    console.log(`Locking vehicle ${vehicleId}`);
  }
}

export class NotificationService {
  async send(userId: string, message: string): Promise<void> {
    console.log(`Notifying user ${userId}: ${message}`);
  }
}

export class AuditLogger {
  async log(ride: Ride): Promise<void> {
    console.log(`Auditing ride ${ride.id}`);
  }
}

export class EndRideService {
  async execute(rideId: string): Promise<void> {
    const rideRepository = new RideApiRepository();
    const paymentService = new PaymentService();
    const vehicleIoT = new VehicleIoTService();
    const notificationService = new NotificationService();
    const auditLogger = new AuditLogger();

    // 1. Find ride by ID
    const ride = await rideRepository.findById(rideId);

    // 2. Calculate amount based on vehicle type
    let totalCost = 0;

    switch (ride.vehicleType) {
      case "CAR":
        totalCost = ride.minutes * 0.5 + ride.distanceKm * 0.2;
        break;

      case "MOTO":
        totalCost = ride.minutes * 0.3;
        break;

      case "BIKE":
        totalCost = ride.minutes * 0.1;
        break;
    }

    // 3. Execute payment
    const payment = await paymentService.charge(ride.userId, totalCost);

    if (!payment) {
      throw new Error("Payment failed");
    }

    // 4. Lock vehicle
    await vehicleIoT.lock(ride.vehicleId);

    // 5. Update status and persist
    ride.status = "FINISHED";
    ride.totalCost = totalCost;
    await rideRepository.save(ride);

    // 6. Send notification
    await notificationService.send(
      ride.userId,
      `Your ride has ended. Total cost: €${totalCost}`
    );

    // 7. Audit logging
    await auditLogger.log(ride);
  }
}
