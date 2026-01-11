import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import {
  AuditLogger,
  EndRideService,
  NotificationService,
  PaymentService,
  Ride,
  RideApiRepository,
  VehicleIoTService,
} from "./end-ride-service";

const baseRideCar: Ride = {
  id: "ride-1",
  vehicleId: "vehicle-1",
  vehicleType: "CAR",
  userId: "user-1",
  minutes: 10,
  distanceKm: 5,
  status: "ACTIVE",
};

const baseRideMoto: Ride = {
  id: "ride-2",
  vehicleId: "vehicle-2",
  vehicleType: "MOTO",
  userId: "user-2",
  minutes: 15,
  distanceKm: 8,
  status: "ACTIVE",
};

const baseRideBike: Ride = {
  id: "ride-3",
  vehicleId: "vehicle-3",
  vehicleType: "BIKE",
  userId: "user-3",
  minutes: 20,
  distanceKm: 10,
  status: "ACTIVE",
};

describe("Given EndRideService", () => {
  let rideCar: Ride;
  let rideMoto: Ride;
  let rideBike: Ride;

  let findByIdSpy: ReturnType<typeof vi.spyOn>;
  let saveSpy: ReturnType<typeof vi.spyOn>;
  let chargeSpy: ReturnType<typeof vi.spyOn>;
  let lockSpy: ReturnType<typeof vi.spyOn>;
  let notifySpy: ReturnType<typeof vi.spyOn>;
  let auditSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Clone rides to avoid mutation between tests
    rideCar = { ...baseRideCar };
    rideMoto = { ...baseRideMoto };
    rideBike = { ...baseRideBike };

    findByIdSpy = vi.spyOn(RideApiRepository.prototype, "findById");
    saveSpy = vi
      .spyOn(RideApiRepository.prototype, "save")
      .mockResolvedValue(undefined);
    chargeSpy = vi
      .spyOn(PaymentService.prototype, "charge")
      .mockResolvedValue(true);
    lockSpy = vi
      .spyOn(VehicleIoTService.prototype, "lock")
      .mockResolvedValue(undefined);
    notifySpy = vi
      .spyOn(NotificationService.prototype, "send")
      .mockResolvedValue(undefined);
    auditSpy = vi
      .spyOn(AuditLogger.prototype, "log")
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("When payment succeeds", () => {
    describe("And when the vehicle is a car", () => {
      test("Then it should finish the ride and charge correctly", async () => {
        findByIdSpy.mockResolvedValue(rideCar);

        const service = new EndRideService();
        await service.execute("ride-1");

        expect(findByIdSpy).toHaveBeenCalledWith("ride-1");
        expect(chargeSpy).toHaveBeenCalledWith("user-1", 10 * 0.5 + 5 * 0.2);
        expect(lockSpy).toHaveBeenCalledWith("vehicle-1");
        expect(saveSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            status: "FINISHED",
            totalCost: 10 * 0.5 + 5 * 0.2,
          })
        );
        expect(notifySpy).toHaveBeenCalledWith(
          "user-1",
          expect.stringContaining("Total cost")
        );
        expect(auditSpy).toHaveBeenCalled();
      });
    });

    describe("And when the vehicle is a moto", () => {
      test("Then it should finish the ride and charge correctly", async () => {
        findByIdSpy.mockResolvedValue(rideMoto);

        const service = new EndRideService();
        await service.execute("ride-2");

        expect(chargeSpy).toHaveBeenCalledWith("user-2", 15 * 0.3);
        expect(saveSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            status: "FINISHED",
            totalCost: 15 * 0.3,
          })
        );
      });
    });

    describe("And when the vehicle is a bike", () => {
      test("Then it should finish the ride and charge correctly", async () => {
        findByIdSpy.mockResolvedValue(rideBike);

        const service = new EndRideService();
        await service.execute("ride-3");

        expect(chargeSpy).toHaveBeenCalledWith("user-3", 20 * 0.1);
        expect(saveSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            status: "FINISHED",
            totalCost: 20 * 0.1,
          })
        );
      });
    });
  });

  describe("When payment fails", () => {
    test("Then it should throw an error and stop execution", async () => {
      findByIdSpy.mockResolvedValue(rideMoto);
      chargeSpy.mockResolvedValue(false);

      const service = new EndRideService();

      await expect(service.execute("ride-2")).rejects.toThrow("Payment failed");

      expect(lockSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
      expect(notifySpy).not.toHaveBeenCalled();
      expect(auditSpy).not.toHaveBeenCalled();
    });
  });
});
