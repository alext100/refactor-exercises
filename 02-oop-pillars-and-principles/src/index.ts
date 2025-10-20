import { JsonFormatter } from "./formatters/jsonFormatter";
import { CsvFormatter } from "./formatters/csvFormatter";
import { DeviceExporter } from "./core/deviceExporter";
import { FileOutput } from "./outputs/fileOutput";
import { JsonParser } from "./parsers/jsonParser";

const inputJson = `[{"id":"d1","name":"Sensor","mac":"AA:BB","geolocation":{"lat":40.4,"lon":-3.7},"telemetry":[{"name":"t","value":"22"}]}]`;

const parser = new JsonParser();
const jsonFormatter = new JsonFormatter();
const csvFormatter = new CsvFormatter();
const output = new FileOutput();

const jsonExporter = new DeviceExporter(parser, jsonFormatter, output);
const csvExporter = new DeviceExporter(parser, csvFormatter, output);

jsonExporter.export(inputJson, "json", "./devices.json");
csvExporter.export(inputJson, "csv", "./devices.csv");
