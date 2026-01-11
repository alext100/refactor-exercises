import {
  TurnOnCommand,
  MoveDownCommand,
  MoveLeftCommand,
  MoveRightCommand,
  MoveUpCommand,
} from "./commands";
import { InputController } from "./input-controller";

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

// Example usage
const camera = new Camera();
const inputController = new InputController();

inputController.bind("ENTER", new TurnOnCommand(camera));
inputController.bind("W", new MoveUpCommand(camera));
inputController.bind("A", new MoveLeftCommand(camera));
inputController.bind("S", new MoveDownCommand(camera));
inputController.bind("D", new MoveRightCommand(camera));
