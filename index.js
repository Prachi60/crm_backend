import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./app/dbConfig/dbConfig.js"
import setupRoutes from "./app/routes/index.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
connectDB();
setupRoutes(app);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
