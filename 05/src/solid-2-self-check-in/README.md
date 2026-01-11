# Refactorización usando SOLID

Código que rompe alguno/s de los principios SOLID. El objetivo es refactorizar el código para que cumpla con dichos principios.

1. Describir el algoritmo de la operación/es principal del negocio
2. Analizar el código de la funcionalidad pensando en quien me pide cada uno de sus bloques y cómo evolucionaría
3. Indicar si se rompe algún principio SOLID
4. Refactorizar la funcionalidad para que cumpla con SOLID.

Sistema de Recepción en Hoteles (Hospitality)

Tenemos un proceso en nuestro hotel para hacer auto-checkin, que utiliza las operaciones de la habitación para ejecutar nuestra operación de negocio.

```ts
interface RoomStayManager {
  checkIn(): void; // Permite hacer el checkin de la habitación
  generateDigitalKey(): void; // Genera la llave digital para que el cliente pueda usarla
  postMinibarCharge(itemId: string): void; // Carga un producto del minibar a la habitación
  setHousekeepingStatus(status: string): void; // Cambia el estado de la habitación (SUCIO, LIMPIO, ...)
}

// Quiosco autoservicio en el lobby
class SelfCheckInKiosk {
  completeProcess(stay: RoomStayManager) {
    stay.checkIn();
    stay.generateDigitalKey();
  }
}
```
