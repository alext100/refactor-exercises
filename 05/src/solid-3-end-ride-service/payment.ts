export interface PaymentGateway {
  charge(userId: string, amount: number): Promise<boolean>;
}

export class PaymentService implements PaymentGateway {
  async charge(userId: string, amount: number): Promise<boolean> {
    console.log(`Charging user ${userId}: €${amount}`);
    return true;
  }
}
