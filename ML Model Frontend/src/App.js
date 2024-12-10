import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse";
import axios from "axios";
import DrawerComponent from "./Components/DrawerComponent";
import Navbar from "./Components/Navbar";
import { color } from "highcharts";

// Register components for Chart.js
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const App = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [customParams, setCustomParams] = useState({});
  const [plotData, setPlotData] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [dataset, setDataset] = useState({ x: [], y: [], classes: [] });
  const [loading, setLoading] = useState(false);
  const [isModelLock, setisModelLock] = useState(false);

  useEffect(() => {
    // Load dataset from CSV
    Papa.parse("/dataset.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = result.data;
        const x = data.map((row) => row.Feature1);
        const y = data.map((row) => row.Feature2);
        const classes = data.map((row) => row.Class);
        setDataset({ x, y, classes });
      },
      error: (error) => console.error("Error loading CSV: ", error),
    });
  }, []);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setCustomParams({});
  };

  const handleParamChange = (param, value) => {
    setCustomParams({ ...customParams, [param]: value });
  };

  const runModel = async () => {
    if (!selectedModel) {
      alert("Please select a model first!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/model", {
        model: selectedModel,
        hyperparameters: customParams,
      });

      const { accuracy, boundary } = response.data;

      const { xx, yy, zz } = boundary;
      const transformedBoundary = [];
      for (let i = 0; i < xx.length; i++) {
        for (let j = 0; j < xx[i].length; j++) {
          transformedBoundary.push({
            xx: xx[i][j],
            yy: yy[i][j],
            class: zz[i][j],
          });
        }
      }

      setAccuracy(accuracy);
      setPlotData(transformedBoundary);
      setLoading(false);
      setisModelLock(true);
    } catch (error) {
      setisModelLock(false);
      setLoading(false);
      console.error("Error running the model:", error);
      alert("Failed to run the model. Please check the backend.");
    }
  };

  const chartData = {
    datasets: [
      {
        label: "Data Points",
        data: dataset.x.map((val, index) => ({
          x: val,
          y: dataset.y[index],
          class: dataset.classes[index],
        })),
        backgroundColor: dataset.classes.map((cls) =>
          cls === 0 ? "rgba(255, 99, 132, 0.8)" : "rgba(54, 162, 235, 0.8)"
        ),
        pointRadius: 5,
      },
      ...(Array.isArray(plotData) && plotData.length > 0
        ? [
            {
              label: "Decision Boundary",
              data: plotData.map((point) => ({
                x: point.xx,
                y: point.yy,
                backgroundColor: point.class === 0 ? "black" : "white",
              })),
              backgroundColor: plotData.map((point) =>
                point.class === 0 ? "black" : "white"
              ),
              type: "scatter",
              pointRadius: 1,
            },
          ]
        : []),
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          generateLabels: (chart) => [
            {
              text: "Class 0 (Data Points)",
              fillStyle: "rgba(255, 99, 132, 0.8)",
            },
            {
              text: "Class 1 (Data Points)",
              fillStyle: "rgba(54, 162, 235, 0.8)",
            },
            {
              text: "Class 0 (Predicted Regions)",
              fillStyle: "black",
            },
            {
              text: "Class 1 (Predicted Regions)",
              fillStyle: "white",
            },
          ],
        },
      },
      title: {
        display: true,
        text: "Binary Classification with Decision Boundary",
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: -3,
        max: 3,
        title: {
          display: true,
          text: "Feature 1",
        },
      },
      y: {
        type: "linear",
        min: -1,
        max: 4,
        title: {
          display: true,
          text: "Feature 2",
        },
      },
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* drawerComponent */}
      <DrawerComponent
        selectedModel={selectedModel}
        handleModelChange={handleModelChange}
        customParams={customParams}
        accuracy={accuracy}
        handleParamChange={handleParamChange}
        isModelLock={isModelLock}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <Navbar
          runModel={runModel}
          isModelLock={isModelLock}
          loading={loading}
        />
        <Box
          mt={4}
          sx={{
            width: "600px",
            height: "600px",
            margin: "auto",
          }}
        >
          {dataset.x.length > 0 && (
            <Scatter data={chartData} options={chartOptions} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
