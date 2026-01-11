export interface VehicleLocker {
  lock(vehicleId: string): Promise<void>;
}

export class VehicleIoTService implements VehicleLocker {
  async lock(vehicleId: string): Promise<void> {
    console.log(`Locking vehicle ${vehicleId}`);
  }
}
