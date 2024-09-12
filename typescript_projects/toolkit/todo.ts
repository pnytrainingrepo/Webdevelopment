import {input, select, confirm} from '@inquirer/prompts';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

class TodoApp {
  private tasks: Task[] = [];
  private nextId: number = 1;

  public async addTask(): Promise<void> {
    const  description  = await input({
      message: 'Enter task description:',
    });

    const task: Task = {
      id: this.nextId++,
      description,
      completed: false,
    };
    this.tasks.push(task);
    console.log(`Added: "${task.description}"`);
  } // End Add Function

  public listTasks(): void {
    console.log("\nYour Tasks:");
    if (this.tasks.length === 0) {
      console.log("No tasks available.");
      return;
    }
    this.tasks.forEach((task) => {
      const status = task.completed ? "[x]" : "[ ]";
      console.log(`${task.id}. ${status} ${task.description}`);
    });
  } //End List Task

  public async completeTask(): Promise<void> {
    if (this.tasks.length === 0) {
      console.log("No tasks to complete.");
      return;
    }

    const taskId  = await input({
      message: 'Enter task ID to complete:',
      validate: (input) => {
        const id = Number(input);
        return id && this.tasks.find((task) => task.id === id) ? true : 'Invalid task ID';
      },
    });

    const task = this.tasks.find((t) => t.id === Number(taskId));
    if (task) {
      task.completed = true;
      console.log(`Task ${taskId} marked as complete.`);
    }
  }

  public async deleteTask(): Promise<void> {
    if (this.tasks.length === 0) {
      console.log("No tasks to delete.");
      return;
    }

    const taskId = await input({
      message: 'Enter task ID to delete:',
      validate: (input) => {
        const id = Number(input);
        return id && this.tasks.find((task) => task.id === id) ? true : 'Invalid task ID';
      },
    });

    const index = this.tasks.findIndex((t) => t.id === Number(taskId));
    if (index !== -1) {
      const deletedTask = this.tasks.splice(index, 1);
      console.log(`Deleted: "${deletedTask[0].description}"`);
    }
  }

  public async menu(): Promise<void> {
    let exit = false;
    while (!exit) {
      const choice  = await select({
        message: 'TODO App',
        choices: [
          { name: 'Add Task', value: 'add' },
          { name: 'List Tasks', value: 'list' },
          { name: 'Complete Task', value: 'complete' },
          { name: 'Delete Task', value: 'delete' },
          { name: 'Exit', value: 'exit' },
        ],
      });

      switch (choice) {
        case 'add':
          await this.addTask();
          break;
        case 'list':
          this.listTasks();
          break;
        case 'complete':
          await this.completeTask();
          break;
        case 'delete':
          await this.deleteTask();
          break;
        case 'exit':
          exit = true;
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid option, please try again.');
      }
    }
  }
}

// Instantiate the TodoApp and run the menu
const app = new TodoApp();
app.menu();
