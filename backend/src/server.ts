import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/hello",(req,res)=>{
    res.send("Hello World");
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
