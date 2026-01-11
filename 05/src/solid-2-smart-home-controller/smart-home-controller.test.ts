import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SmartDevice, SmartHomeController } from "./smart-home-controller";

const device1: SmartDevice = {
  id: "device-1",
  room: "Kitchen",
  activate: vi.fn(),
  deactivate: vi.fn(),
};

const device2: SmartDevice = {
  id: "device-2",
  room: "Bathroom",
  activate: vi.fn(),
  deactivate: vi.fn(),
};

describe("Given SmartHomeController", () => {
  let controller: SmartHomeController;

  beforeEach(() => {
    controller = new SmartHomeController();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("When activating a specific device", () => {
    test("Then it should call activate on the correct device", () => {
      controller.addDevice(device1);

      controller.activateDevice("device-1");

      expect(device1.activate).toHaveBeenCalledOnce();
      expect(device1.deactivate).not.toHaveBeenCalled();
    });
  });

  describe("When deactivating a specific device", () => {
    test("Then it should call deactivate on the correct device", () => {
      controller.addDevice(device2);

      controller.deactivateDevice("device-2");

      expect(device2.deactivate).toHaveBeenCalledOnce();
      expect(device2.activate).not.toHaveBeenCalled();
    });
  });

  describe("When activating all devices", () => {
    test("Then it should activate every registered device", () => {
      controller.addDevice(device1);
      controller.addDevice(device2);

      controller.activateAll();

      expect(device1.activate).toHaveBeenCalledOnce();
      expect(device2.activate).toHaveBeenCalledOnce();
    });
  });

  describe("When deactivating all devices", () => {
    test("Then it should deactivate every registered device", () => {
      controller.addDevice(device1);
      controller.addDevice(device2);

      controller.deactivateAll();

      expect(device1.deactivate).toHaveBeenCalledOnce();
      expect(device2.deactivate).toHaveBeenCalledOnce();
    });
  });
});
