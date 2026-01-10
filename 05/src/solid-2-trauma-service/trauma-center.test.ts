import { describe, expect, test, vi } from "vitest";
import { TraumaTriageService } from "./trauma-center";

describe("Given TraumaTriageService", () => {
  describe("When patient is NOT critical", () => {
    test("Then it should not trigger alarm nor persist emergency", async () => {
      const riskModel = {
        predict: vi.fn().mockResolvedValue("LOW"),
      };

      const alarmSystem = {
        trigger: vi.fn(),
      };

      const repository = {
        saveEmergency: vi.fn(),
      };

      const service = new TraumaTriageService(
        riskModel,
        alarmSystem,
        repository
      );

      await service.prioritizePatient({
        heartRate: 80,
        oxygenSaturation: 98,
        age: 30,
      });

      expect(riskModel.predict).toHaveBeenCalled();
      expect(alarmSystem.trigger).not.toHaveBeenCalled();
      expect(repository.saveEmergency).not.toHaveBeenCalled();
    });
  });

  describe("When patient is CRITICAL by AI risk model", () => {
    test("Then it should trigger alarm and persist emergency", async () => {
      const riskModel = {
        predict: vi.fn().mockResolvedValue("CRITICAL"),
      };

      const alarmSystem = {
        trigger: vi.fn().mockResolvedValue(undefined),
      };

      const repository = {
        saveEmergency: vi.fn().mockResolvedValue(undefined),
      };

      const service = new TraumaTriageService(
        riskModel,
        alarmSystem,
        repository
      );

      await service.prioritizePatient({
        heartRate: 90,
        oxygenSaturation: 95,
        age: 65,
      });

      expect(alarmSystem.trigger).toHaveBeenCalledWith(80, "RED_ALERT");
      expect(repository.saveEmergency).toHaveBeenCalledWith("EMERGENCY: 65y");
    });
  });

  describe("When patient is critical by clinical rules", () => {
    test("Then it should trigger alarm and persist emergency even if AI is not critical", async () => {
      const riskModel = {
        predict: vi.fn().mockResolvedValue("LOW"),
      };

      const alarmSystem = {
        trigger: vi.fn().mockResolvedValue(undefined),
      };

      const repository = {
        saveEmergency: vi.fn().mockResolvedValue(undefined),
      };

      const service = new TraumaTriageService(
        riskModel,
        alarmSystem,
        repository
      );

      await service.prioritizePatient({
        heartRate: 130,
        oxygenSaturation: 85,
        age: 40,
      });

      expect(alarmSystem.trigger).toHaveBeenCalledWith(80, "RED_ALERT");
      expect(repository.saveEmergency).toHaveBeenCalledWith("EMERGENCY: 40y");
    });
  });
});
