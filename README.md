# ML Studio: Experiment and Learn 🌟

An interactive web application that visualizes the output of machine learning models. The project integrates a dynamic **frontend** and a robust **backend**, enabling users to explore different ML models and their outputs seamlessly.

---

## 🎯 Features

- **Dynamic Frontend**: 
  - ReactJS-powered UI for a smooth user experience.
  - Intuitive interface for selecting models and visualizing results.
  
- **Backend Flexibility**:
  - Node.js backend orchestrating API calls.
  - Python scripts to handle model processing and data handling.
  
- **Visualization**:
  - Supports multiple ML models with user-friendly outputs.
  - Dynamically adapts to the user's choice of ML model.

---

## 🚀 Tech Stack

- **Frontend**: ReactJS, CSS
- **Backend**: Node.js, Express.js
- **ML Models**: Python, Scikit-Learn, TensorFlow
- **Others**: Postman for API testing

---

## 📁 Project Structure

```
📦 ML-Model-Visualization
├── 📂 backend
│   ├── app.js                # Node.js entry point
|   ├── model.py
│   ├── routes/
│   │   ├── modelRoutes.js    # API routes for ML models
│   └── controllee/
│       ├── ml.controller.js         
│       
│
├── 📂 frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── Dataset/           
│   │   ├── App.js            # Main React app
│   │   └── index.js          # Entry point for React
│
└── README.md                 # Project documentation
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Install **Node.js** from [Node.js official website](https://nodejs.org/).

### Steps to Run Locally

1. **Clone the Repository**:
   
2. **Setup the Backend**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server using `nodemon`:
     ```bash
     npx nodemon app.js
     ```

3. **Setup the Frontend**:
   - Open a new terminal and navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Open the Application**:
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.

---



**Happy Visualizing!** 🚀
