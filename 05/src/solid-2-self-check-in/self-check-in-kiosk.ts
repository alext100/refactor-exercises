export interface CheckInService {
  checkIn(): Promise<void>;
}

export interface DigitalKeyProvider {
  generateKey(): Promise<void>;
}

export interface MinibarBillingService {
  postMinibarCharge(itemId: string): Promise<void>;
}

type HousekeepingStatus = "DIRTY" | "CLEAN" | "IN_PROGRESS";
export interface HousekeepingService {
  setHousekeepingStatus(status: HousekeepingStatus): Promise<void>;
}

export class SelfCheckInService {
  constructor(
    private readonly checkInService: CheckInService,
    private readonly keyProvider: DigitalKeyProvider
  ) {}

  async completeProcess(): Promise<void> {
    await this.checkInService.checkIn();
    await this.keyProvider.generateKey();
  }
}

// Usage example with mock implementations
class MockCheckInService implements CheckInService {
  async checkIn(): Promise<void> {
    console.log("Guest checked in.");
  }
}
class MockDigitalKeyProvider implements DigitalKeyProvider {
  async generateKey(): Promise<void> {
    console.log("Digital key generated.");
  }
}

const checkInService = new MockCheckInService();
const keyProvider = new MockDigitalKeyProvider();
const selfCheckInKiosk = new SelfCheckInService(checkInService, keyProvider);

selfCheckInKiosk.completeProcess();
