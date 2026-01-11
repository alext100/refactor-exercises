import { Command } from "./commands";

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
