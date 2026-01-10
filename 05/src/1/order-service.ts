type Order = {
  id: string;
  items: string[];
};

interface OrderRepository {
  save(order: Order): Promise<void>;
}

class OrderApiRepository implements OrderRepository {
  async save(order: Order) {
    await fetch("https://api.business.com/order", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }
}

class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async create(orderData: Order) {
    if (orderData.items.length === 0) throw new Error("Carrito vacío");

    await this.repository.save(orderData);

    await fetch("https://hooks.slack.com/services/...", {
      method: "POST",
      body: JSON.stringify({ text: `Nuevo pedido: ${orderData.id}` }),
    });
  }
}
