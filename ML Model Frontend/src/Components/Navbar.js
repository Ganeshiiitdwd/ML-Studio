import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar({ runModel, isModelLock, loading }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}> {/* Primary Blue */}
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif', 
            letterSpacing: '1px' 
          }}
        >
          ML Studio: Experiment and Learn
        </Typography>
        <Button 
          sx={{ 
            fontWeight: 'bold', 
            backgroundColor: 'white', 
            color: '#1976d2', 
            mr: 2, 
            px: 3, 
            '&:hover': { backgroundColor: '#f0f0f0' } 
          }} 
          onClick={runModel} 
          disabled={isModelLock}
        >
          {loading ? "Running Model" : "Run Model"}
        </Button>
        {isModelLock && (
          <Button 
            sx={{ 
              fontWeight: 'bold', 
              backgroundColor: '#ffffff', 
              color: '#d32f2f', // Red for attention
              px: 3, 
              '&:hover': { backgroundColor: '#fce4ec' } 
            }} 
            onClick={() => window.location.reload()}
          >
            Train New Model
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
