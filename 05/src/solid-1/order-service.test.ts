import { describe, expect, test, vi } from "vitest";
import { OrderService } from "./order-service";

describe("Given OrderService class", () => {
  describe("When it receives an order with empty items", () => {
    test("Then it should throw an error 'Carrito vacío'", async () => {
      const orderRepository = { save: vi.fn() };
      const notificationProvider = { send: vi.fn() };

      const orderService = new OrderService(
        orderRepository,
        notificationProvider
      );

      await expect(
        orderService.create({ id: "123", items: [] })
      ).rejects.toThrow("Carrito vacío");
    });
  });

  describe("When it receives a valid order", () => {
    test("Then it should save the order and send a notification", async () => {
      const orderRepository = { save: vi.fn().mockResolvedValue(undefined) };
      const notificationProvider = {
        send: vi.fn().mockResolvedValue(undefined),
      };

      const orderService = new OrderService(
        orderRepository,
        notificationProvider
      );

      await orderService.create({ id: "123", items: ["camisa", "pantalón"] });

      expect(orderRepository.save).toHaveBeenCalledWith({
        id: "123",
        items: ["camisa", "pantalón"],
      });
      expect(notificationProvider.send).toHaveBeenCalledWith(
        "Nuevo pedido: 123"
      );
    });
  });
});
