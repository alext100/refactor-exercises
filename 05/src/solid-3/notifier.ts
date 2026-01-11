export interface Notifier {
  send(userId: string, message: string): Promise<void>;
}

export class NotificationService implements Notifier {
  async send(userId: string, message: string): Promise<void> {
    console.log(`Notifying user ${userId}: ${message}`);
  }
}
