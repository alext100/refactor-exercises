export interface SmartDevice {
  id: string;
  room: string;
  activate(): void;
  deactivate(): void;
}

class Light implements SmartDevice {
  constructor(public id: string, public room: string) {}

  activate(): void {
    this.turnOn();
  }

  deactivate(): void {
    this.turnOff();
  }

  private turnOn() {
    console.log(`💡 Light in ${this.room} is now ON`);
  }

  private turnOff() {
    console.log(`💡 Light in ${this.room} is now OFF`);
  }
}

class Thermostat implements SmartDevice {
  constructor(public id: string, public room: string) {}

  activate(): void {
    this.heat();
  }

  deactivate(): void {
    this.cool();
  }

  private heat() {
    console.log(`🌡️ Thermostat in ${this.room} is now HEATING`);
  }

  private cool() {
    console.log(`🌡️ Thermostat in ${this.room} is now COOLING`);
  }
}

class Blind implements SmartDevice {
  constructor(public id: string, public room: string) {}

  activate(): void {
    this.open();
  }

  deactivate(): void {
    this.close();
  }

  private open() {
    console.log(`🪟 Blind in ${this.room} is now OPEN`);
  }

  private close() {
    console.log(`🪟 Blind in ${this.room} is now CLOSED`);
  }
}

export class SmartHomeController {
  private readonly devices: SmartDevice[] = [];

  addDevice(device: SmartDevice) {
    this.devices.push(device);
  }

  activateDevice(deviceId: string) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) return;
    device.activate();
  }

  deactivateDevice(deviceId: string) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) return;
    device.deactivate();
  }

  activateAll() {
    this.devices.forEach((device) => device.activate());
  }

  deactivateAll() {
    this.devices.forEach((device) => device.deactivate());
  }
}

// Uso
const controller = new SmartHomeController();
controller.addDevice(new Light("light-1", "Living Room"));
controller.addDevice(new Thermostat("thermo-1", "Bedroom"));
controller.addDevice(new Blind("blind-1", "Kitchen"));

controller.activateAll();
controller.deactivateDevice("light-1");
