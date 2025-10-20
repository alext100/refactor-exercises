# Device Exporter

A TypeScript project for exporting device lists in various formats (JSON, CSV), designed with **SOLID principles** and **OOP best practices**.

---

## Overview

This project demonstrates:

- Parsing device lists from JSON input.
- Formatting device data for multiple outputs (JSON, CSV, etc.).
- Writing formatted data to files or other outputs.
- Robust error handling (invalid input, unsupported formats).

Design highlights:

- **Single Responsibility**: Each class focuses on one task.
- **Loose Coupling**: Components interact via interfaces.
- **Dependency Injection**: Favors composition over inheritance.
- **Easy Extensibility**: New formats and outputs can be added with minimal changes.

---

## Architecture
<img width="1601" height="1121" alt="02 drawio" src="https://github.com/user-attachments/assets/9ecaac83-cb80-41ba-a1d6-a791b4b1d367" />

### Domain Models

- **Device**: Contains id, name, MAC address, location, and telemetry.
- **Location**: Latitude and longitude.
- **TelemetryItem**: Key-value data for devices.

### Interfaces

- **IParser**: Converts strings to `Device[]`.
- **IFormatter**: Converts `Device[]` to formatted strings.
- **IOutput**: Handles writing formatted strings.
- **IExporter**: Orchestrates parsing, formatting, and output.

### Implementations

- **JsonParser**: Parses JSON input.
- **JsonFormatter**: Outputs JSON.
- **CsvFormatter**: Outputs CSV.
- **FileOutput**: Simulates file writing via console.
- **DeviceExporter**: Coordinates the export process.

---

## Folder Structure

```
src/
├─ core/
│  ├─ exporter.abstract.ts
│  ├─ deviceExporter.ts
│  └─ exporter.interface.ts
├─ parsers/
│  └─ jsonParser.ts
├─ formatters/
│  ├─ jsonFormatter.ts
│  └─ csvFormatter.ts
├─ outputs/
│  └─ fileOutput.ts
├─ domain/
│  ├─ device.ts
│  └─ errors.ts
└─ index.ts
```

## Tests:

```bash
npm run test
npm run test:coverage
```

```
 % Coverage report from v8
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   82.71 |    84.21 |    90.9 |   82.71 | 
 src                    |       0 |        0 |       0 |       0 | 
  index.ts              |       0 |        0 |       0 |       0 | 1-18
 src/core               |     100 |    83.33 |     100 |     100 | 
  deviceExporter.ts     |     100 |      100 |     100 |     100 |
  exporter.abstract.ts  |     100 |       75 |     100 |     100 | 22
  exporter.interface.ts |       0 |        0 |       0 |       0 |
 src/domain             |     100 |      100 |     100 |     100 |
  device.ts             |       0 |        0 |       0 |       0 |
  errors.ts             |     100 |      100 |     100 |     100 |
 src/formatters         |     100 |      100 |     100 |     100 |
  csvFormatter.ts       |     100 |      100 |     100 |     100 |
  jsonFormatter.ts      |     100 |      100 |     100 |     100 |
 src/outputs            |     100 |      100 |     100 |     100 |
  fileOutput.ts         |     100 |      100 |     100 |     100 |
 src/parsers            |     100 |       80 |     100 |     100 |
  jsonParser.ts         |     100 |       80 |     100 |     100 | 14
------------------------|---------|----------|---------|---------|-------------------
```

```
 ✓ src/formatters/csvFormatter.test.ts (4 tests) 5ms
   ✓ Given a CsvFormatter (4)
     ✓ When formatting a non-empty list of devices (3)
       ✓ Then it should return a string containing the CSV header 2ms
       ✓ Then each device should correspond to a line after the header 0ms
       ✓ Then the output should match the expected CSV format 0ms
     ✓ When formatting an empty device list (1)
       ✓ Then it should return only the header line 0ms
 ✓ src/outputs/fileOutput.test.ts (2 tests) 8ms
   ✓ Given a FileOutput (2)
     ✓ When writing content to a file (1)
       ✓ Then it should log the destination path and content 5ms
     ✓ When writing empty content (1)
       ✓ Then it should still log the destination 0ms
 ✓ src/formatters/jsonFormatter.test.ts (2 tests) 4ms
   ✓ Given a JsonFormatter (2)
     ✓ When formatting a non-empty device list (1)
       ✓ Then it should return a JSON string that parses back to the same array 2ms
     ✓ When formatting an empty list (1)
       ✓ Then it should return '[]' (valid JSON array) 0ms
 ✓ src/parsers/jsonParser.test.ts (3 tests) 5ms
   ✓ Given a JsonParser (3)
     ✓ When parsing a valid devices JSON array (1)
       ✓ Then it should return an array of Device objects 3ms
     ✓ When parsing JSON that is not an array (1)
       ✓ Then it should throw ExportException with 'JSON must be an array' message 1ms
     ✓ When parsing malformed JSON (1)
       ✓ Then it should throw ExportException with 'Invalid JSON input' message 0ms
 ✓ src/core/deviceExporter.test.ts (2 tests) 6ms
   ✓ Given a DeviceExporter (2)
     ✓ When export is called with input data and destination (1)
       ✓ Then it should parse, format, and output the data in order 4ms
     ✓ When parser throws an error (1)
       ✓ Then the error should propagate 1ms
```
---



