import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { Project, SimpleTask, TaskManager } from "./task-manager";

describe("Given TaskManager", () => {
  let consoleSpy: any;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("When displayAll is called after adding tasks and projects", () => {
    test("Then it should print the exact expected output", () => {
      const manager = new TaskManager();

      // Tareas simples
      manager.add(new SimpleTask("Buy groceries", 1, true));
      manager.add(new SimpleTask("Call client", 0.5));

      // Proyecto complejo
      const webProject = new Project("Website Redesign");
      webProject.add(new SimpleTask("Design mockups", 8, true));

      const devPhase = new Project("Development");
      devPhase.add(new SimpleTask("Setup project", 2, true));
      devPhase.add(new SimpleTask("Implement frontend", 16));
      devPhase.add(new SimpleTask("Implement backend", 20));

      webProject.add(devPhase);
      webProject.add(new SimpleTask("Deploy to production", 3));

      manager.add(webProject);

      // Otro proyecto
      const marketingProject = new Project("Marketing Campaign");
      marketingProject.add(new SimpleTask("Create content", 5));
      marketingProject.add(new SimpleTask("Social media posts", 3, true));

      manager.add(marketingProject);

      manager.displayAll();

      const output = consoleSpy.mock.calls
        .map((call: any) => call[0])
        .join("\n")
        .trim();

      const expectedOutput = `📝 My Tasks:

✅ Buy groceries (1h)
⏳ Call client (0.5h)
📋 Website Redesign (49h total)
  ✅ Design mockups (8h)
  📋 Development (38h total)
    ✅ Setup project (2h)
    ⏳ Implement frontend (16h)
    ⏳ Implement backend (20h)
  ⏳ Deploy to production (3h)
📋 Marketing Campaign (8h total)
  ⏳ Create content (5h)
  ✅ Social media posts (3h)

⏱️  Total estimated hours: 58.5h`;

      expect(output).toBe(expectedOutput);
    });
  });
});
