type Order = {
  id: string;
  items: string[];
};

class OrderService {
  async create(orderData: Order) {
    if (orderData.items.length === 0) throw new Error("Carrito vacío");

    await fetch("https://api.business.com/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });

    await fetch("https://hooks.slack.com/services/...", {
      method: "POST",
      body: JSON.stringify({ text: `Nuevo pedido: ${orderData.id}` }),
    });
  }
}
