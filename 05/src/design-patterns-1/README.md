# Control de Cámara - Patrón Command

## Contexto

Tenemos un sistema que nos permite controlar una cámara fotográfica a través de comandos.

La lógica de negocio de cómo funciona la cámara ya está implementada en la clase `Camera`, que expone métodos para realizar diferentes acciones, como se ve en el código más abajo.

## Obejtivo

Tu objetivo es implementar un sistema que permita asignar teclas del teclado a acciones de la cámara, de forma que:
• Las teclas puedan cambiarse fácilmente.
• La lógica de la cámara esté desacoplada del input.
• Cada acción esté encapsulada usando el patrón Command.

No es necesario que desarrolles la escucha "real" del teclado, sino en que puedas diseñar e implementar las clases necesarias para asociar una tecla a una acción concreta de la cámara.

### Código inicial:

```typescript
export class Camera {
  turnOn(): void {
    console.log("Camera turned on");
  }
  moveUp(): void {
    console.log("Camera moved up");
  }
  moveDown(): void {
    console.log("Camera moved down");
  }
  moveLeft(): void {
    console.log("Camera moved left");
  }
  moveRight(): void {
    console.log("Camera moved right");
  }
}
```

Ejemplo de uso de cómo podría ser la implementación:

```typescript
// Ejemplo en TypeScript
const camera = new Camera();
const controller = new InputController();
controller.bind("W", new MoveUpCommand(camera));
```

## Preguntas a hacerte

- Según la definición de Refactoring Guru, la clase Receiver:
  "The Receiver class contains some business logic. Almost any object may act as a receiver. Most commands only handle the details of how a request is passed to the receiver, while the receiver itself does the actual work."
  En nuestro caso, ¿quién sería la clase receptora que contiene la lógica de negocio (y hace que efectivamente se ejecuten las acciones pretendidas).
- ¿Qué ventajas aporta el patrón Command en este caso concreto?
- ¿Cómo se podría modificar la tecla asociada a una acción concreta en tiempo de ejecución?
