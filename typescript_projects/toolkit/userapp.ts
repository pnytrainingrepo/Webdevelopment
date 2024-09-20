import {input, select, confirm} from '@inquirer/prompts';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

class UserApp {
  private users: User[] = [];
  private nextId: number = 1;

  public async addUser(): Promise<void> {
    const  name  = await input({
      message: 'Enter User Name:',
    });

  const  age  = Number(await input({
      message: 'Enter User Age:',
    }));

    const user: User = {
      id: this.nextId++,
      name,
      age,
      active: false,
    };
    this.users.push(user);
    console.log(`Added User: "${user.name}" And Age "${user.age}" `);
  } // End Add User Function

  public listUsers(): void {
    console.log("\nUsers Info List:");
    if (this.users.length === 0) {
      console.log("No User available.");
      return;
    }
    this.users.forEach((user) => {
      const status = user.active ? "[x]" : "[ ]";
      console.log(`${user.id}. ${status} ${user.name}`);
    });
  } //End List User

  public async activeUsers(): Promise<void> {
    if (this.users.length === 0) {
      console.log("No User is Active.");
      return;
    }

    const userId  = await input({
      message: 'Enter User ID to Active:',
      validate: (input) => {
        const id = Number(input);
        return id && this.users.find((user) => user.id === id) ? true : 'Invalid User ID';
      },
    });

    const user = this.users.find((t) => t.id === Number(userId));
    if (user) {
      user.active = true;
      console.log(`User ${userId} marked as Active.`);
    }
  }

  public async deleteUser(): Promise<void> {
    if (this.users.length === 0) {
      console.log("No User to delete.");
      return;
    }

    const userId = await input({
      message: 'Enter User ID to delete:',
      validate: (input) => {
        const id = Number(input);
        return id && this.users.find((user) => user.id === id) ? true : 'Invalid User ID';
      },
    });

    const index = this.users.findIndex((t) => t.id === Number(userId));
    if (index !== -1) {
      const deletedTask = this.users.splice(index, 1);
      console.log(`Deleted: "${deletedTask[0].name}"`);
    }
  }

  public async menu(): Promise<void> {
    let exit = false;
    while (!exit) {
      const choice  = await select({
        message: 'User Info App',
        choices: [
          { name: 'Add User', value: 'add' },
          { name: 'List Users', value: 'list' },
          { name: 'Active User', value: 'active' },
          { name: 'Delete User', value: 'delete' },
          { name: 'Exit', value: 'exit' },
        ],
      });

      switch (choice) {
        case 'add':
          await this.addUser();
          break;
        case 'list':
          this.listUsers();
          break;
        case 'active':
          await this.activeUsers();
          break;
        case 'delete':
          await this.deleteUser();
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
const app = new UserApp();
app.menu();