import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Dataset
data = {
    "study_hours": [2, 3, 4, 5, 6, 7, 8, 9, 10],
    "attendance": [60, 65, 70, 75, 80, 82, 85, 90, 95],
    "previous_marks": [45, 50, 55, 60, 65, 68, 72, 78, 85],
    "final_marks": [48, 52, 57, 62, 68, 71, 76, 82, 90]
}

df = pd.DataFrame(data)

# Input features
X = df[["study_hours", "attendance", "previous_marks"]]


# Target
y = df["final_marks"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = LinearRegression()

# Train model
model.fit(X_train, y_train)

# Save model
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)

print("Model trained successfully!")
print("Model accuracy:", model.score(X_test, y_test))