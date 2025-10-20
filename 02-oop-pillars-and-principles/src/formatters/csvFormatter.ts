import { IFormatter } from "../core/exporter.interface";
import { Device } from "../domain/device";

export class CsvFormatter implements IFormatter {
  format(devices: Device[]): string {
    const header = "id,name,mac,lat,lon,telemetry";
    const rows = devices.map((d) => {
      const telemetryStr = d.telemetry
        .map((t) => `${t.name}=${t.value}`)
        .join(";");
      return `${d.id},"${d.name}","${d.mac}",${d.geolocation.lat},${d.geolocation.lon},"${telemetryStr}"`;
    });
    return [header, ...rows].join("\n");
  }
}
