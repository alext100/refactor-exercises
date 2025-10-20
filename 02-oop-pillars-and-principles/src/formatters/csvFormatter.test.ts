import { beforeEach, describe, expect, test } from "vitest";
import { CsvFormatter } from "./csvFormatter";
import { Device } from "../domain/device";

describe("Given a CsvFormatter", () => {
  let formatter: CsvFormatter;
  let sampleDevices: Device[];

  beforeEach(() => {
    formatter = new CsvFormatter();
    sampleDevices = [
      {
        id: "d1",
        name: "Sensor puerta",
        mac: "AA:BB:CC:11:22:33",
        geolocation: { lat: 40.4168, lon: -3.7038 },
        telemetry: [
          { name: "temperatura", value: "22.5" },
          { name: "humedad", value: "50%" },
        ],
      },
      {
        id: "d2",
        name: "Sensor ventana",
        mac: "AA:BB:CC:44:55:66",
        geolocation: { lat: 41.3902, lon: 2.154 },
        telemetry: [{ name: "temperatura", value: "21.0" }],
      },
    ];
  });

  describe("When formatting a non-empty list of devices", () => {
    test("Then it should return a string containing the CSV header", () => {
      const result = formatter.format(sampleDevices);

      expect(result.startsWith("id,name,mac,lat,lon,telemetry")).toBe(true);
    });

    test("Then each device should correspond to a line after the header", () => {
      const result = formatter.format(sampleDevices);

      const lines = result.split("\n");

      expect(lines.length).toBe(sampleDevices.length + 1);
    });

    test("Then the output should match the expected CSV format", () => {
      const result = formatter.format(sampleDevices);

      const expected = `id,name,mac,lat,lon,telemetry
d1,"Sensor puerta","AA:BB:CC:11:22:33",40.4168,-3.7038,"temperatura=22.5;humedad=50%"
d2,"Sensor ventana","AA:BB:CC:44:55:66",41.3902,2.154,"temperatura=21.0"`;

      expect(result).toBe(expected);
    });
  });

  describe("When formatting an empty device list", () => {
    test("Then it should return only the header line", () => {
      const result = formatter.format([]);

      expect(result).toBe("id,name,mac,lat,lon,telemetry");
    });
  });
});
