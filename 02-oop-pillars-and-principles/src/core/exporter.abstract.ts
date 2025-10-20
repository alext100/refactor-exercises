import { IExporter, IParser, IFormatter, IOutput } from "./exporter.interface";
import { ExportException } from "../domain/errors";

export abstract class DeviceListParserAndExporter implements IExporter {
  protected parser: IParser;
  protected formatter: IFormatter;
  protected output: IOutput;

  constructor(parser: IParser, formatter: IFormatter, output: IOutput) {
    this.parser = parser;
    this.formatter = formatter;
    this.output = output;
  }

  export(inputJson: string, format: string, outputPath: string): string {
    try {
      const devices = this.parser.parse(inputJson);
      const content = this.formatter.format(devices);
      this.output.write(content, outputPath);
      return content;
    } catch (e) {
      throw new ExportException(e instanceof Error ? e.message : String(e));
    }
  }
}
