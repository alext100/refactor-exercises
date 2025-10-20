import { IParser, IFormatter, IOutput } from "./exporter.interface";
import { DeviceListParserAndExporter } from "./exporter.abstract";

export class DeviceExporter extends DeviceListParserAndExporter {
  constructor(parser: IParser, formatter: IFormatter, output: IOutput) {
    super(parser, formatter, output);
  }
}
