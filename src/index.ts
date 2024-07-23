import express, { Request, Response } from "express";
import connectDB from "./config/database";
import phoneDirectoryRoutes from "./route/phoneDirectory";

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/api/phone-directory", phoneDirectoryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Phone Directory API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
