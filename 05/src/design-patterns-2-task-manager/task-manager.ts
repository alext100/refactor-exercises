abstract class Task {
  public name: string;
  public completed: boolean;

  constructor(name: string = "", completed: boolean = false) {
    this.name = name;
    this.completed = completed;
  }

  abstract getHours(): number;
  abstract display(indent?: number): void;

  complete(): void {
    this.completed = true;
  }

  isCompleted(): boolean {
    return this.completed;
  }
}

export class SimpleTask extends Task {
  private readonly estimatedHours: number;
  public name: string;
  public completed: boolean;

  constructor(
    name: string,
    estimatedHours: number,
    completed: boolean = false
  ) {
    super(name, completed);

    this.estimatedHours = estimatedHours;
    this.name = name;
    this.completed = completed;
  }

  getHours(): number {
    return this.estimatedHours;
  }

  display(indent: number = 0): void {
    const prefix = "  ".repeat(indent);
    const status = this.completed ? "✅" : "⏳";
    console.log(`${prefix}${status} ${this.name} (${this.estimatedHours}h)`);
  }
}

export class Project extends Task {
  private children: Task[] = [];

  add(task: Task): void {
    this.children.push(task);
  }

  remove(task: Task): void {
    this.children = this.children.filter((t) => t !== task);
  }

  complete(): void {
    super.complete();
    this.children.forEach((child) => child.complete());
  }

  getHours(): number {
    return this.children.reduce((total, task) => total + task.getHours(), 0);
  }

  isCompleted(): boolean {
    return this.children.every((task) => task.isCompleted());
  }

  display(indent: number = 0): void {
    const prefix = "  ".repeat(indent);
    const status = this.isCompleted() ? "✅" : "📋";
    console.log(`${prefix}${status} ${this.name} (${this.getHours()}h total)`);

    this.children.forEach((task) => task.display(indent + 1));
  }
}

export class TaskManager {
  private readonly tasks: Task[] = [];

  add(task: Task): void {
    this.tasks.push(task);
  }

  getTotalHours(): number {
    return this.tasks.reduce((total, task) => total + task.getHours(), 0);
  }

  displayAll(): void {
    console.log("\n📝 My Tasks:\n");

    this.tasks.forEach((task) => task.display());

    console.log(`\n⏱️  Total estimated hours: ${this.getTotalHours()}h\n`);
  }
}

// Uso
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
