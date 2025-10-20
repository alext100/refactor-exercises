import { IOutput } from "../core/exporter.interface";

export class FileOutput implements IOutput {
  write(content: string, destination: string): void {
    console.log(`Writing to file ${destination}:\n${content}`);
  }
}
