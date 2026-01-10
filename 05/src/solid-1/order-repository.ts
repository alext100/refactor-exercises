import { Order } from "./order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
}

export class OrderApiRepository implements OrderRepository {
  async save(order: Order) {
    await fetch("https://api.business.com/order", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }
}
