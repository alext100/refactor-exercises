# Sistema de Tareas Anidadas - Refactorizando con el patrón Composite

## Contexto

Tienes un sistema de gestión de tareas (TODO list) que permite crear tareas simples y proyectos con subtareas. El código actual funciona, pero es difícil de mantener y extender porque trata las tareas simples y los proyectos de manera completamente diferente.

### Estructura del Código Actual

**`SimpleTask`** - Representa una tarea atómica (_hoja del árbol_)

- Es la unidad básica de trabajo
- Tiene un nombre, horas estimadas y estado de completitud
- **No puede contener** otras tareas
- Ejemplos: "Comprar pan", "Llamar al cliente", "Escribir documentación"

**`Project`** - Representa un contenedor de tareas (_nodo compuesto_)

- Agrupa múltiples tareas relacionadas
- **Puede contener**: tareas simples (`SimpleTask`) y/o otros proyectos (`Project`)
- Calcula automáticamente el total de horas sumando todos sus hijos
- Ejemplos: "Rediseño Web", "Campaña Marketing", "Sprint 3"

**`TaskManager`** - Gestor principal del sistema

- Coordina todas las tareas y proyectos del usuario
- Mantiene dos listas separadas: una para tareas simples y otra para proyectos
- Responsable de:
  - Agregar tareas/proyectos
  - Calcular el total de horas de todo el sistema
  - Mostrar la jerarquía completa en consola

**Ejemplo de jerarquía:**

```text
TaskManager
├─ SimpleTask: "Buy groceries"
├─ SimpleTask: "Call client"
├─ Project: "Website Redesign"
│   ├─ SimpleTask: "Design mockups"
│   ├─ Project: "Development"
│   │   ├─ SimpleTask: "Setup project"
│   │   ├─ SimpleTask: "Implement frontend"
│   │   └─ SimpleTask: "Implement backend"
│   └─ SimpleTask: "Deploy to production"
└─ Project: "Marketing Campaign"
    ├─ SimpleTask: "Create content"
    └─ SimpleTask: "Social media posts"
```

## Objetivo

Refactorizar el código aplicando el **patrón Composite**, de modo que tanto las tareas simples como los proyectos puedan ser tratados de manera uniforme a través de una interfaz común.

## 💻 Código Inicial

### TypeScript

```typescript
class SimpleTask {
  constructor(
    public name: string,
    public estimatedHours: number,
    public completed: boolean = false
  ) {}

  complete() {
    this.completed = true;
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

class Project {
  private tasks: SimpleTask[] = [];
  private subProjects: Project[] = [];

  constructor(public name: string, public completed: boolean = false) {}

  addTask(task: SimpleTask) {
    this.tasks.push(task);
  }

  addSubProject(project: Project) {
    this.subProjects.push(project);
  }

  complete() {
    this.completed = true;
    this.tasks.forEach((task) => task.complete());
    this.subProjects.forEach((project) => project.complete());
  }

  // Lógica duplicada y compleja para calcular horas
  getHours(): number {
    let totalHours = 0;

    for (const task of this.tasks) {
      totalHours += task.getHours();
    }

    for (const project of this.subProjects) {
      totalHours += project.getHours();
    }

    return totalHours;
  }

  // Verificación manual de todas las tareas y subproyectos
  isFullyCompleted(): boolean {
    for (const task of this.tasks) {
      if (!task.completed) return false;
    }

    for (const project of this.subProjects) {
      if (!project.isFullyCompleted()) return false;
    }

    return true;
  }

  // Lógica de display duplicada y anidada
  display(indent: number = 0): void {
    const prefix = "  ".repeat(indent);
    const status = this.isFullyCompleted() ? "✅" : "📋";
    console.log(`${prefix}${status} ${this.name} (${this.getHours()}h total)`);

    for (const task of this.tasks) {
      task.display(indent + 1);
    }

    for (const project of this.subProjects) {
      project.display(indent + 1);
    }
  }
}

// El código cliente debe tratar SimpleTask y Project de manera diferente
class TaskManager {
  private simpleTasks: SimpleTask[] = [];
  private projects: Project[] = [];

  addSimpleTask(task: SimpleTask) {
    this.simpleTasks.push(task);
  }

  addProject(project: Project) {
    this.projects.push(project);
  }

  // Nuevamente se debe calcular por separado repitiendo lógica
  getTotalHours(): number {
    let totalHours = 0;

    for (const task of this.simpleTasks) {
      totalHours += task.getHours();
    }

    for (const project of this.projects) {
      totalHours += project.getHours();
    }

    return totalHours;
  }

  displayAll(): void {
    console.log("\n📝 My Tasks:\n");

    for (const task of this.simpleTasks) {
      task.display();
    }

    for (const project of this.projects) {
      project.display();
    }

    console.log(`\n⏱️  Total estimated hours: ${this.getTotalHours()}h\n`);
  }
}

// Uso
const manager = new TaskManager();

// Tareas simples
manager.addSimpleTask(new SimpleTask("Buy groceries", 1, true));
manager.addSimpleTask(new SimpleTask("Call client", 0.5));

// Proyecto complejo
const webProject = new Project("Website Redesign");
webProject.addTask(new SimpleTask("Design mockups", 8, true));

const devPhase = new Project("Development");
devPhase.addTask(new SimpleTask("Setup project", 2, true));
devPhase.addTask(new SimpleTask("Implement frontend", 16));
devPhase.addTask(new SimpleTask("Implement backend", 20));

webProject.addSubProject(devPhase);
webProject.addTask(new SimpleTask("Deploy to production", 3));

manager.addProject(webProject);

// Otro proyecto
const marketingProject = new Project("Marketing Campaign");
marketingProject.addTask(new SimpleTask("Create content", 5));
marketingProject.addTask(new SimpleTask("Social media posts", 3, true));

manager.addProject(marketingProject);

manager.displayAll();
```

## 🔴 Problemas Identificados

1. **Código duplicado**: `Project` y `SimpleTask` tienen lógica similar pero no comparten interfaz
2. **Tratamiento diferenciado**: `TaskManager` debe manejar dos listas separadas y tratarlas de forma diferente
3. **Difícil de extender**: Añadir un nuevo tipo (ej: `Milestone`, `Sprint`) requeriría más duplicación
4. **Acoplamiento alto**: El código cliente debe conocer la diferencia entre tareas simples y proyectos
5. **Violación de OCP**: Añadir operaciones nuevas (ej: `getProgress()`, `countTasks()`) requiere modificar múltiples clases

## ✅ Requisitos de la Refactorización

Tu refactorización debe cumplir:

1. **Crear una interfaz/clase abstracta común** para tareas simples y proyectos
2. **Eliminar la duplicación** de código entre `SimpleTask` y `Project`
3. **Permitir tratar uniformemente** todas las tareas desde `TaskManager`
4. **Facilitar operaciones recursivas** (sumar horas, verificar completitud, etc.)
5. **Mantener la salida exacta** del programa (mismo output en consola)

## 💡 Pistas

- Piensa en qué operaciones son comunes a ambas clases
- ¿Cómo puedes hacer que un `Project` contenga tanto tareas como otros proyectos de manera uniforme?
- El patrón Composite se basa en tres tipos de piezas: Component (interfaz común), Leaf (elemento simple), Composite (contenedor). Piensa cómo nuestro sistema encaja en estos roles.
- Las operaciones recursivas se vuelven muy simples cuando todos los elementos comparten la misma interfaz

## 📝 Entrega Esperada

1. Código refactorizado aplicando el patrón Composite
2. Diagrama de clases mostrando la estructura del patrón
3. Reflexiona acerca de:
   - Qué problemas presentaba el código original respecto a nivel de acoplamiento y cumplimiento de principios SOLID
   - Cómo el patrón resuelve los problemas identificados
   - Cómo sería añadir un nuevo tipo de tarea (ej: `Milestone`) vs cómo se haría en el código original
   - Si ves algún problema en tu implementación y cómo lo mejorarías

## Output esperado del programa

```text
📝 My Tasks:

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

⏱️  Total estimated hours: 58.5h
```
