import { AuditLogger, AuditTrail } from "./audit";
import {
  BikeFareCalculator,
  CarFareCalculator,
  FareCalculator,
  MotoFareCalculator,
} from "./fair-calculator";
import { NotificationService, Notifier } from "./notifier";
import { PaymentGateway, PaymentService } from "./payment";
import { RideApiRepository, RideRepository } from "./ride-repository";
import { VehicleIoTService, VehicleLocker } from "./vehicle-locker";

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
