import { Camera } from ".";

export interface Command {
  execute(): void;
}

export class TurnOnCommand implements Command {
  constructor(private readonly camera: Camera) {}

  execute(): void {
    this.camera.turnOn();
  }
}

export class MoveUpCommand implements Command {
  constructor(private readonly camera: Camera) {}

  execute(): void {
    this.camera.moveUp();
  }
}

export class MoveDownCommand implements Command {
  constructor(private readonly camera: Camera) {}

  execute(): void {
    this.camera.moveDown();
  }
}

export class MoveLeftCommand implements Command {
  constructor(private readonly camera: Camera) {}

  execute(): void {
    this.camera.moveLeft();
  }
}

export class MoveRightCommand implements Command {
  constructor(private readonly camera: Camera) {}

  execute(): void {
    this.camera.moveRight();
  }
}
