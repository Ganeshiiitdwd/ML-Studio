import json
import sys
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import pandas as pd
import numpy as np
import os
# Ensure correct file path
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, 'Dataset', 'dataset.csv')

# Check file existence
if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    sys.exit(1)

df = pd.read_csv(file_path)
# df=pd.read_csv('/Dataset/dataset.csv')
def get_decision_boundary(model, x_range, y_range, resolution=0.05):
    xx, yy = np.meshgrid(
        np.arange(x_range[0], x_range[1], resolution),
        np.arange(y_range[0], y_range[1], resolution)
    )
    grid_points = np.c_[xx.ravel(), yy.ravel()]
    zz = model.predict(grid_points).reshape(xx.shape)
    return xx, yy, zz


def train_evaluate(model_name, x_train, y_train, x_test, y_test, user_hyperparams):
    default_hyper = {
        "logistic_regression": {"C": 1.0, "solver": "lbfgs", "max_iter": 1000},
        "decision_tree": {"criterion": "gini", "max_depth": None},
        "random_forest": {"n_estimators": 100, "max_depth": None, "random_state": 18},
        "svm": {"C": 1.0, "kernel": "rbf"}
    }

    if model_name not in default_hyper:
        return {"error": f"Invalid Model Name: {model_name}"}

    model_params = default_hyper[model_name]
    model_params.update(user_hyperparams)

    if model_name == "logistic_regression":
        model = LogisticRegression(**model_params)
    elif model_name == "decision_tree":
        model = DecisionTreeClassifier(**model_params)
    elif model_name == "random_forest":
        model = RandomForestClassifier(**model_params)
    elif model_name == "svm":
        model = SVC(**model_params)
    else:
        return {"error": "Invalid Model Name"}

    model.fit(x_train, y_train)
    predictions = model.predict(x_test)
    accuracy = accuracy_score(y_test, predictions)

    # Compute decision boundary
    x_min, x_max = x_train[:, 0].min() - 1, x_train[:, 0].max() + 1
    y_min, y_max = x_train[:, 1].min() - 1, x_train[:, 1].max() + 1
    xx, yy, zz = get_decision_boundary(model, (x_min, x_max), (y_min, y_max))
    return {"accuracy": accuracy,"boundary": {"xx": xx.tolist(), "yy": yy.tolist(), "zz": zz.tolist()},}

if __name__ == "__main__":
    # Read input from Node.js
    input_data = json.loads(sys.stdin.read())

    model_name = input_data.get("model")
    hyperparameters = input_data.get("hyperparameters", {})

    # Extract features and labels
    X = df[['Feature1', 'Feature2']].values
    y = df['Class'].values
    X_train, X_test = X[:200], X[200:]
    y_train, y_test = y[:200], y[200:]

    results = train_evaluate(model_name, X_train, y_train, X_test, y_test, hyperparameters)
    
    # Output the result as JSON
    print(json.dumps(results))
