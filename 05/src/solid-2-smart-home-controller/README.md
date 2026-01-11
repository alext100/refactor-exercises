# Refactorización usando SOLID

Código que rompe alguno/s de los principios SOLID. El objetivo es refactorizar el código para que cumpla con dichos principios.

1. Describir el algoritmo de la operación/es principal del negocio
2. Analizar el código de la funcionalidad pensando en quien me pide cada uno de sus bloques y cómo evolucionaría
3. Indicar si se rompe algún principio SOLID
4. Refactorizar la funcionalidad para que cumpla con SOLID.

Sistema de Domótica

Estás desarrollando un sistema de domótica para controlar dispositivos inteligentes en una casa. El sistema actual puede encender/apagar diferentes dispositivos (luces, termostatos, persianas), pero el código está acoplado y cada dispositivo tiene métodos con nombres diferentes para realizar acciones similares. Los dispositivos deben poder ser tratados de manera uniforme sin necesidad de condicionales basados en el tipo

```typescript
// Dispositivos con métodos inconsistentes
class Light {
  constructor(public id: string, public room: string) {}

  turnOn() {
    console.log(`💡 Light in ${this.room} is now ON`);
  }

  turnOff() {
    console.log(`💡 Light in ${this.room} is now OFF`);
  }
}

class Thermostat {
  constructor(public id: string, public room: string) {}

  heat() {
    console.log(`🌡️ Thermostat in ${this.room} is now HEATING`);
  }

  cool() {
    console.log(`🌡️ Thermostat in ${this.room} is now COOLING`);
  }
}

class Blind {
  constructor(public id: string, public room: string) {}

  open() {
    console.log(`🪟 Blind in ${this.room} is now OPEN`);
  }

  close() {
    console.log(`🪟 Blind in ${this.room} is now CLOSED`);
  }
}

// Gestor que viola LSP y OCP
class SmartHomeController {
  private devices: Array<Light | Thermostat | Blind> = [];

  addDevice(device: Light | Thermostat | Blind) {
    this.devices.push(device);
  }

  // Se deben conocer los métodos específicos de cada dispositivo
  activateDevice(deviceId: string) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) return;

    // Condicionales basados en tipo
    if (device instanceof Light) {
      device.turnOn();
    } else if (device instanceof Thermostat) {
      device.heat();
    } else if (device instanceof Blind) {
      device.open();
    }
  }

  deactivateDevice(deviceId: string) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) return;

    // Más condicionales basados en tipo
    if (device instanceof Light) {
      device.turnOff();
    } else if (device instanceof Thermostat) {
      device.cool();
    } else if (device instanceof Blind) {
      device.close();
    }
  }

  activateAll() {
    this.devices.forEach((device) => {
      if (device instanceof Light) {
        device.turnOn();
      } else if (device instanceof Thermostat) {
        device.heat();
      } else if (device instanceof Blind) {
        device.open();
      }
    });
  }
}

// Uso
const controller = new SmartHomeController();
controller.addDevice(new Light("light-1", "Living Room"));
controller.addDevice(new Thermostat("thermo-1", "Bedroom"));
controller.addDevice(new Blind("blind-1", "Kitchen"));

controller.activateAll();
controller.deactivateDevice("light-1");
```
