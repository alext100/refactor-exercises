import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  EndRideService,
  Ride,
  RideRepository,
  PaymentGateway,
  VehicleLocker,
  Notifier,
  AuditTrail,
  FareCalculator,
} from "./end-ride-service";

const rideCar: Ride = {
  id: "ride-1",
  vehicleId: "vehicle-1",
  vehicleType: "CAR",
  userId: "user-1",
  minutes: 10,
  distanceKm: 5,
  status: "ACTIVE",
};

const rideMoto: Ride = {
  id: "ride-2",
  vehicleId: "vehicle-2",
  vehicleType: "MOTO",
  userId: "user-2",
  minutes: 15,
  distanceKm: 8,
  status: "ACTIVE",
};

const rideBike: Ride = {
  id: "ride-3",
  vehicleId: "vehicle-3",
  vehicleType: "BIKE",
  userId: "user-3",
  minutes: 20,
  distanceKm: 10,
  status: "ACTIVE",
};

const createRideRepository = (ride: Ride): RideRepository => ({
  findById: vi.fn().mockResolvedValue({ ...ride }),
  save: vi.fn().mockResolvedValue(undefined),
});

const paymentGateway: PaymentGateway = {
  charge: vi.fn().mockResolvedValue(true),
};

const vehicleLocker: VehicleLocker = {
  lock: vi.fn().mockResolvedValue(undefined),
};

const notifier: Notifier = {
  send: vi.fn().mockResolvedValue(undefined),
};

const auditTrail: AuditTrail = {
  log: vi.fn().mockResolvedValue(undefined),
};

const carFareCalculator: FareCalculator = {
  supports: (type) => type === "CAR",
  calculate: (ride) => ride.minutes * 0.5 + ride.distanceKm * 0.2,
};

const motoFareCalculator: FareCalculator = {
  supports: (type) => type === "MOTO",
  calculate: (ride) => ride.minutes * 0.3,
};

const bikeFareCalculator: FareCalculator = {
  supports: (type) => type === "BIKE",
  calculate: (ride) => ride.minutes * 0.1,
};

describe("Given EndRideService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When payment succeeds", () => {
    test("Then it should finish a CAR ride correctly", async () => {
      const rideRepository = createRideRepository(rideCar);

      const service = new EndRideService(
        rideRepository,
        paymentGateway,
        vehicleLocker,
        notifier,
        auditTrail,
        [carFareCalculator]
      );

      await service.execute("ride-1");

      expect(paymentGateway.charge).toHaveBeenCalledWith(
        "user-1",
        10 * 0.5 + 5 * 0.2
      );

      expect(vehicleLocker.lock).toHaveBeenCalledWith("vehicle-1");

      expect(rideRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "FINISHED",
          totalCost: 10 * 0.5 + 5 * 0.2,
        })
      );

      expect(notifier.send).toHaveBeenCalled();
      expect(auditTrail.log).toHaveBeenCalled();
    });

    test("Then it should finish a MOTO ride correctly", async () => {
      const rideRepository = createRideRepository(rideMoto);

      const service = new EndRideService(
        rideRepository,
        paymentGateway,
        vehicleLocker,
        notifier,
        auditTrail,
        [motoFareCalculator]
      );

      await service.execute("ride-2");

      expect(paymentGateway.charge).toHaveBeenCalledWith("user-2", 15 * 0.3);
    });

    test("Then it should finish a BIKE ride correctly", async () => {
      const rideRepository = createRideRepository(rideBike);

      const service = new EndRideService(
        rideRepository,
        paymentGateway,
        vehicleLocker,
        notifier,
        auditTrail,
        [bikeFareCalculator]
      );

      await service.execute("ride-3");

      expect(paymentGateway.charge).toHaveBeenCalledWith("user-3", 20 * 0.1);
    });
  });

  describe("When payment fails", () => {
    test("Then it should throw an error and stop execution", async () => {
      const rideRepository = createRideRepository(rideMoto);

      const failingPaymentGateway: PaymentGateway = {
        charge: vi.fn().mockResolvedValue(false),
      };

      const service = new EndRideService(
        rideRepository,
        failingPaymentGateway,
        vehicleLocker,
        notifier,
        auditTrail,
        [motoFareCalculator]
      );

      await expect(service.execute("ride-2")).rejects.toThrow("Payment failed");

      expect(vehicleLocker.lock).not.toHaveBeenCalled();
      expect(rideRepository.save).not.toHaveBeenCalled();
      expect(notifier.send).not.toHaveBeenCalled();
      expect(auditTrail.log).not.toHaveBeenCalled();
    });
  });
});
