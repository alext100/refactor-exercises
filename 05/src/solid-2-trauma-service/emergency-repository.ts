/* Mocked external BinaryDB for demonstration purposes */
export class BinaryDB {
  write(info: string): void {
    console.log(`Writing to binary DB: ${info}`);
  }
}

export interface EmergencyRepository {
  saveEmergency(info: string): Promise<void>;
}

export class BinaryEmergencyRepository implements EmergencyRepository {
  async saveEmergency(info: string): Promise<void> {
    const db = new BinaryDB();
    db.write(info);
  }
}
