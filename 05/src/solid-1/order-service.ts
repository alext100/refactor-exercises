import {
  NotificationProvider,
  SlackNotificationProvider,
} from "./notification-provider";
import { Order } from "./order";
import { OrderApiRepository, OrderRepository } from "./order-repository";

export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly notifier: NotificationProvider
  ) {}

  async create(orderData: Order) {
    if (orderData.items.length === 0) throw new Error("Carrito vacío");

    await this.repository.save(orderData);

    const message = `Nuevo pedido: ${orderData.id}`;
    await this.notifier.send(message);
  }
}

const orderRepository = new OrderApiRepository();
const notificationProvider = new SlackNotificationProvider();

const orderService = new OrderService(orderRepository, notificationProvider);

await orderService.create({ id: "123", items: ["camisa", "pantalón"] });
