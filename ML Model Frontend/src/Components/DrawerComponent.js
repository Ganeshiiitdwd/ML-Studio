import React from "react";
import {
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function DrawerComponent({
  selectedModel,
  handleModelChange,
  customParams,
  accuracy,
  handleParamChange,
  isModelLock,
}) {
  const modelOptions = {
    logistic_regression: { C: [0.1, 10], solver: ["lbfgs", "sag", "saga"] },
    decision_tree: { criterion: ["gini", "entropy"], max_depth: [1, 20] },
    random_forest: { n_estimators: [10, 200], max_depth: [1, 20] },
    svm: { C: [0.1, 10], kernel: ["linear", "rbf", "poly"] },
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        backgroundColor: "#f5f5f5",
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: 2 }}>
        <List>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Select Algorithm</InputLabel>
              <Select
                value={selectedModel}
                onChange={handleModelChange}
                disabled={isModelLock}
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                {Object.keys(modelOptions).map((model) => (
                  <MenuItem value={model} key={model}>
                    {model.replace("_", " ").toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>

          {selectedModel &&
            modelOptions[selectedModel] &&
            Object.entries(modelOptions[selectedModel]).map(([param, range]) =>
              Array.isArray(range) ? (
                typeof range[0] === "number" ? (
                  <ListItem key={param}>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontWeight: "bold", fontSize: "14px", color: "#1976d2" }}
                      >
                        {param.toUpperCase()}
                      </Typography>
                      <Slider
                        value={customParams[param] || range[0]}
                        onChange={(e, value) => handleParamChange(param, value)}
                        min={range[0]}
                        max={range[1]}
                        step={param === "C" ? 0.1 : 1}
                        valueLabelDisplay="auto"
                        disabled={isModelLock}
                        sx={{ color: "#1976d2" }}
                      />
                    </Box>
                  </ListItem>
                ) : (
                  <ListItem key={param}>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontWeight: "bold", fontSize: "14px", color: "#1976d2" }}
                      >
                        {param.toUpperCase()}
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={customParams[param] || ""}
                          onChange={(e) => handleParamChange(param, e.target.value)}
                          disabled={isModelLock}
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          {range.map((option) => (
                            <MenuItem value={option} key={option}>
                              {option.toUpperCase()}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </ListItem>
                )
              ) : null
            )}
        </List>
        {/* Display model accuracy */}
        {typeof accuracy === "number" && accuracy > 0 ? (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              mt={2}
              sx={{ fontWeight: "bold", color: "#388e3c" }}
            >
              Model Accuracy: {accuracy * 100}%
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              mt={2}
              sx={{ fontWeight: "bold", color: "#424242" }}
            >
              Hyperparameters
            </Typography>
            {Object.entries(customParams).map(([key, value]) => (
              <Typography
                key={key}
                variant="h6"
                textAlign="center"
                mt={1}
                sx={{ fontWeight: "medium", color: "#616161" }}
              >
                {key.toUpperCase()}: {value}
              </Typography>
            ))}
          </>
        ) : null}
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
