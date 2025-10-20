import { beforeEach, describe, expect, test } from "vitest";
import { JsonParser } from "./jsonParser";
import { ExportException } from "../domain/errors";

describe("Given a JsonParser", () => {
  let parser: JsonParser;

  beforeEach(() => {
    parser = new JsonParser();
  });

  describe("When parsing a valid devices JSON array", () => {
    test("Then it should return an array of Device objects", () => {
      const inputString = `[{"id":"d1","name":"Sensor","mac":"AA:BB","geolocation":{"lat":40.4,"lon":-3.7},"telemetry":[{"name":"t","value":"22"}]},{"id":"d2","name":"Actuator","mac":"CC:DD","geolocation":{"lat":41.4,"lon":-4.7},"telemetry":[{"name":"h","value":"55"}]}]`;

      const result = parser.parse(inputString);

      expect(Array.isArray(result)).toBe(true);
      expect(result[0].id).toBe("d1");
      expect(result[0].telemetry?.[0].name).toBe("t");
      expect(result[0].telemetry?.[0].value).toBe("22");
      expect(result[0].geolocation.lat).toBe(40.4);
      expect(result[0].geolocation.lon).toBe(-3.7);
      expect(result[0].mac).toBe("AA:BB");
      expect(result[0].name).toBe("Sensor");

      expect(result[1].id).toBe("d2");
      expect(result[1].telemetry?.[0].name).toBe("h");
      expect(result[1].telemetry?.[0].value).toBe("55");
      expect(result[1].geolocation.lat).toBe(41.4);
      expect(result[1].geolocation.lon).toBe(-4.7);
      expect(result[1].mac).toBe("CC:DD");
      expect(result[1].name).toBe("Actuator");

      expect(result).toHaveLength(2);
    });
  });

  describe("When parsing JSON that is not an array", () => {
    test("Then it should throw ExportException with 'JSON must be an array' message", () => {
      const input = JSON.stringify({ id: "d1", name: "Not an array" });

      expect(() => parser.parse(input)).toThrow(ExportException);
      expect(() => parser.parse(input)).toThrow(/JSON must be an array/);
    });
  });

  describe("When parsing malformed JSON", () => {
    test("Then it should throw ExportException with 'Invalid JSON input' message", () => {
      const input = '[{ "id": "d1", "name": "Sensor" }';

      expect(() => parser.parse(input)).toThrow(ExportException);
      expect(() => parser.parse(input)).toThrow(/Invalid JSON input/);
    });
  });
});
