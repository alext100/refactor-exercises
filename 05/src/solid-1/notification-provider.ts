export interface NotificationProvider {
  send(text: string): Promise<void>;
}

export class SlackNotificationProvider implements NotificationProvider {
  async send(text: string) {
    await fetch("https://hooks.slack.com/services/...", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  }
}
