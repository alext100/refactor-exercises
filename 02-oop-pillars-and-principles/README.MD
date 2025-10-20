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

---
