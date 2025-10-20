import { describe, expect, test } from "vitest";
import { JsonFormatter } from "./jsonFormatter";

const sampleDevices = [
  {
    id: "d1",
    name: "Sensor puerta",
    mac: "AA:BB:CC:11:22:33",
    geolocation: { lat: 40.4168, lon: -3.7038 },
    telemetry: [{ name: "temperatura", value: "22.5" }],
  },
];

describe("Given a JsonFormatter", () => {
  describe("When formatting a non-empty device list", () => {
    test("Then it should return a JSON string that parses back to the same array", () => {
      const jsonFormatter = new JsonFormatter();
      const out = jsonFormatter.format(sampleDevices);

      const parsed = JSON.parse(out);

      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toEqual(sampleDevices);
    });
  });

  describe("When formatting an empty list", () => {
    test("Then it should return '[]' (valid JSON array)", () => {
      const jsonFormatter = new JsonFormatter();

      const out = jsonFormatter.format([]);

      expect(out).toBe("[]");
      expect(JSON.parse(out)).toEqual([]);
    });
  });
});
