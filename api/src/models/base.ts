import { Knex } from "knex";
export class BaseRepo<T extends {}> {
  protected tableName: string;
  protected db: Knex;
  constructor(db: Knex, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }
  // Fetch Tasks
  public async find() {
    return await this.db(this.tableName).select<T>().orderBy('name', 'asc');
  }
  // Insert the new task
  public async createTask(request: any, response: any) {
    await this.db(this.tableName).insert(request.body)
      .then(async () => {
        const updateTasks = await this.db(this.tableName).select<T>().orderBy('name', 'asc');
        return response.send({ updateTasks, msg: "success" });
      })
  }

  // Update the task
  public async updateTask(request: any, response: any) {
    await this.db(this.tableName).where({ id: request.body.id })
      .update({
        name: request.body.name,
        completed: request.body.completed
      })
      .then(async () => {
        const updateTasks = await this.db(this.tableName).select<T>().orderBy('name', 'asc');
        return response.send({ updateTasks, msg: "success" });
      })
  }

  // Order the task
  public async orderTask(request: any, response: any) {
    if (request.body) {
      const updateTasks = await this.db(this.tableName).select<T>().orderBy('name', request.body.orderStatus);
      return response.send({ updateTasks, msg: "success" });
    }
  }
}
