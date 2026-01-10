import { describe, expect, test, vi } from "vitest";
import { SelfCheckInService } from "./self-check-in-kiosk";

describe("Given SelfCheckInService", () => {
  describe("When completing the self check-in process", () => {
    test("Then it should check in the guest and generate a digital key", async () => {
      const checkInService = {
        checkIn: vi.fn().mockResolvedValue(undefined),
      };
      const digitalKeyProvider = {
        generateKey: vi.fn().mockResolvedValue(undefined),
      };

      const selfCheckInService = new SelfCheckInService(
        checkInService,
        digitalKeyProvider
      );

      await selfCheckInService.completeProcess();

      expect(checkInService.checkIn).toHaveBeenCalledTimes(1);
      expect(digitalKeyProvider.generateKey).toHaveBeenCalledTimes(1);
    });
  });
});
