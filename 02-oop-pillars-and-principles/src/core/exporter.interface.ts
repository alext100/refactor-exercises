import { Device } from "../domain/device";

export interface IParser {
  parse(inputJson: string): Device[];
}

export interface IFormatter {
  format(devices: Device[]): string;
}

export interface IOutput {
  write(content: string, destination: string): void;
}

export interface IExporter {
  export(inputJson: string, format: string, outputPath: string): string;
}
