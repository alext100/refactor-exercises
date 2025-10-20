import { describe, beforeEach, test, expect, vi } from "vitest";
import { DeviceExporter } from "./deviceExporter";
import { IParser, IFormatter, IOutput } from "./exporter.interface";

const sampleDevices = [
  {
    id: "d1",
    name: "Sensor puerta",
    mac: "AA:BB:CC:11:22:33",
    geolocation: { lat: 40.4168, lon: -3.7038 },
    telemetry: [{ name: "temperatura", value: "22.5" }],
  },
];

describe("Given a DeviceExporter", () => {
  let parser: IParser;
  let formatter: IFormatter;
  let output: IOutput;
  let exporter: DeviceExporter;

  beforeEach(() => {
    parser = { parse: vi.fn().mockReturnValue(sampleDevices) };
    formatter = { format: vi.fn().mockReturnValue("formatted-data") };
    output = { write: vi.fn() };
    exporter = new DeviceExporter(parser, formatter, output);
  });

  describe("When export is called with input data and destination", () => {
    test("Then it should parse, format, and output the data in order", () => {
      const inputData = JSON.stringify(sampleDevices);
      const destination = "devices.json";

      exporter.export(inputData, "json", destination);

      expect(parser.parse).toHaveBeenCalledWith(inputData);
      expect(formatter.format).toHaveBeenCalledWith(sampleDevices);
      expect(output.write).toHaveBeenCalledWith("formatted-data", destination);
    });
  });

  describe("When parser throws an error", () => {
    test("Then the error should propagate", () => {
      const inputData = JSON.stringify(sampleDevices);
      const destination = "devices.json";

      (parser.parse as any).mockImplementation(() => {
        throw new Error("Invalid JSON");
      });

      expect(() => exporter.export(inputData, "json", destination)).toThrow(
        "Invalid JSON"
      );
    });
  });
});
