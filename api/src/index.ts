import express, { Request, Response } from "express";
import cors from "cors";
import db from "./models";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await db.taskRepo.find();
  res.send({ tasks });
});

app.post("/create", async (req: Request, res: Response) => {
  await db.taskRepo.createTask(req, res);
});

app.put("/update", async (req: Request, res: Response) => {
  await db.taskRepo.updateTask(req, res);
});

app.post("/order",async (req: Request, res: Response) => {
  await db.taskRepo.orderTask(req,res);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
