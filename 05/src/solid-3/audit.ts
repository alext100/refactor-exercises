import { Ride } from "./types";

export interface AuditTrail {
  log(ride: Ride): Promise<void>;
}

export class AuditLogger implements AuditTrail {
  async log(ride: Ride): Promise<void> {
    console.log(`Auditing ride ${ride.id}`);
  }
}
