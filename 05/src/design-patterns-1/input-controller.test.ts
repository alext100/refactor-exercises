import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  Camera,
  InputController,
  MoveUpCommand,
  MoveDownCommand,
  MoveLeftCommand,
  MoveRightCommand,
  TurnOnCommand,
} from ".";

describe("Given InputController and Camera commands", () => {
  let camera: Camera;
  let controller: InputController;

  beforeEach(() => {
    camera = new Camera();
    controller = new InputController();
  });

  describe("When a TurnOnCommand is bound and executed", () => {
    test("Then it should call camera.turnOn", () => {
      const spy = vi.spyOn(camera, "turnOn");
      controller.bind("ENTER", new TurnOnCommand(camera));

      controller.handleKeyPress("ENTER");

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("When movement commands are bound and executed", () => {
    test("Then MoveUpCommand calls camera.moveUp", () => {
      const spy = vi.spyOn(camera, "moveUp");
      controller.bind("W", new MoveUpCommand(camera));

      controller.handleKeyPress("W");

      expect(spy).toHaveBeenCalled();
    });

    test("Then MoveDownCommand calls camera.moveDown", () => {
      const spy = vi.spyOn(camera, "moveDown");
      controller.bind("S", new MoveDownCommand(camera));

      controller.handleKeyPress("S");

      expect(spy).toHaveBeenCalled();
    });

    test("Then MoveLeftCommand calls camera.moveLeft", () => {
      const spy = vi.spyOn(camera, "moveLeft");
      controller.bind("A", new MoveLeftCommand(camera));

      controller.handleKeyPress("A");

      expect(spy).toHaveBeenCalled();
    });

    test("Then MoveRightCommand calls camera.moveRight", () => {
      const spy = vi.spyOn(camera, "moveRight");
      controller.bind("D", new MoveRightCommand(camera));

      controller.handleKeyPress("D");

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("When a key has no command bound", () => {
    test("Then it should do nothing", () => {
      const spyUp = vi.spyOn(camera, "moveUp");
      controller.handleKeyPress("Z");
      controller.handleKeyPress("X");
      controller.handleKeyPress("C");

      expect(spyUp).not.toHaveBeenCalled();
    });
  });

  describe("When unbinding a key", () => {
    test("Then pressing the key does not execute the command", () => {
      const spy = vi.spyOn(camera, "moveUp");
      const cmd = new MoveUpCommand(camera);
      controller.bind("W", cmd);
      controller.unbind("W");

      controller.handleKeyPress("W");

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("When changing a key binding", () => {
    test("Then the new command should be executed on new key press", () => {
      const spyUp = vi.spyOn(camera, "moveUp");
      const spyDown = vi.spyOn(camera, "moveDown");

      controller.bind("W", new MoveUpCommand(camera));
      controller.unbind("W");
      controller.bind("Q", new MoveUpCommand(camera));
      controller.handleKeyPress("Q");

      controller.bind("S", new MoveDownCommand(camera));
      controller.unbind("S");
      controller.handleKeyPress("S");

      expect(spyUp).toHaveBeenCalled();
      expect(spyDown).not.toHaveBeenCalled();
    });
  });
});
