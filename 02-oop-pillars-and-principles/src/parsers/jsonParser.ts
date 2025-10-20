import { IParser } from "../core/exporter.interface";
import { Device } from "../domain/device";
import { ExportException } from "../domain/errors";

export class JsonParser implements IParser {
  parse(inputJson: string): Device[] {
    try {
      const parsed = JSON.parse(inputJson);
      if (!Array.isArray(parsed))
        throw new Error("JSON must be an array of devices");
      return parsed as Device[];
    } catch (e) {
      throw new ExportException(
        `Invalid JSON input: ${e instanceof Error ? e.message : e}`
      );
    }
  }
}
