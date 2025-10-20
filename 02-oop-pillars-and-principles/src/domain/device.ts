export type TelemetryItem = {
  name: string;
  value: string;
};

export type Location = {
  lat: number;
  lon: number;
};

export type Device = {
  id: string;
  name: string;
  mac: string;
  geolocation: Location;
  telemetry: TelemetryItem[];
};
