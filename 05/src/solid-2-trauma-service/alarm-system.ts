/* Mocked external BoseSpeakerDriver for demonstration purposes */
class BoseSpeakerDriver {
  emitSound(decibels: number, code: string): void {
    console.log(`Emitting sound at ${decibels}dB with code ${code}`);
  }
}

export interface AlarmSystem {
  trigger(decibels: number, code: string): Promise<void>;
}

export class BoseAlarmSystem implements AlarmSystem {
  async trigger(decibels: number, code: string): Promise<void> {
    const speaker = new BoseSpeakerDriver();
    speaker.emitSound(decibels, code);
  }
}
