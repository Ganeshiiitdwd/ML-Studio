import { spawn } from "child_process";
import express from "express";
import Modelroute from './Routes/ml.routes.js'
import compression from "compression"
import cors from 'cors'
import * as dotenv from  'dotenv'
dotenv.config()
const app = express();
app.use(express.json()); // Use the built-in express JSON parser
// compress the resposne as size of response is huge
app.use(cors())
app.use(compression())
app.get('/',(req,res)=>{
res.status(200).json({msg:"Hello World"})
})
app.use('/api/v1',Modelroute)
// Start the server
app.listen(process.env.PORT_SECURE, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT_SECURE}`);
});
