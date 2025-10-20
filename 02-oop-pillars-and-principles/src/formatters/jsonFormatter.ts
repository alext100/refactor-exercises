import { IFormatter } from "../core/exporter.interface";
import { Device } from "../domain/device";

export class JsonFormatter implements IFormatter {
  format(devices: Device[]): string {
    return JSON.stringify(devices, null, 2);
  }
}
