export interface Command {
  execute(): void;
}

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

/* Input Controller */
export class InputController {
  private readonly bindings = new Map<string, Command>();

  bind(key: string, command: Command): void {
    this.bindings.set(key, command);
  }

  unbind(key: string): void {
    this.bindings.delete(key);
  }

  handleKeyPress(key: string): void {
    const command = this.bindings.get(key);
    command?.execute();
  }
}

// Example usage
const camera = new Camera();
const inputController = new InputController();

inputController.bind("W", new MoveUpCommand(camera));
inputController.bind("A", new MoveLeftCommand(camera));
inputController.bind("S", new MoveDownCommand(camera));
inputController.bind("D", new MoveRightCommand(camera));
