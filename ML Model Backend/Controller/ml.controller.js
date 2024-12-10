import { spawn } from "child_process";


const TrainModel=(req,res)=>{
    const { model, hyperparameters } = req.body;

    // Spawn the Python process
    const pythonProcess = spawn("python", ["Models.py"]);
  
    // Prepare the JSON input
    const input = JSON.stringify({ model, hyperparameters });
  
    // Send data to the Python script
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();
  
    let output = "";
  
    // Collect Python script output
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });
  
    // Handle script completion
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        res.status(500).send({ error: "Python script failed" });
      } else {
        try {
          res.json(JSON.parse(output));
          console.log("Model run successfully")
        } catch (error) {
          res.status(500).send({ error: "Invalid JSON response from Python script" });
        }
      }
    });
  
    // Handle errors
    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString());
      res.status(500).send({ error: data.toString() });
    });
}


export {TrainModel}