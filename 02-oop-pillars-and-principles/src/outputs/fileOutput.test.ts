import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { FileOutput } from "./fileOutput";

describe("Given a FileOutput", () => {
  let output: FileOutput;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    output = new FileOutput();
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("When writing content to a file", () => {
    test("Then it should log the destination path and content", () => {
      const content = "some test data";
      const destination = "./output/devices.csv";

      output.write(content, destination);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Writing to file ${destination}`)
      );
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(content));
    });
  });

  describe("When writing empty content", () => {
    test("Then it should still log the destination", () => {
      const destination = "./output/empty.txt";

      output.write("", destination);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Writing to file ${destination}`)
      );
    });
  });
});
