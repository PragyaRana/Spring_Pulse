from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from sklearn.linear_model import LinearRegression

app = FastAPI(title="SpringPulse AI Model")

# ---------- Request Schema ----------
class SpringFlow(BaseModel):
    flowHistory: list


# ---------- Risk Classification ----------
def classify_risk(predicted_flow):

    if predicted_flow >= 4:
        return "Stable"
    elif predicted_flow >= 2:
        return "Warning"
    else:
        return "Critical"


# ---------- Prediction Endpoint ----------
@app.post("/predict")
def predict(data: SpringFlow):

    history = data.flowHistory

    if len(history) < 3:
        return {"message": "Not enough data for prediction"}

    y = np.array(history)
    X = np.arange(len(y)).reshape(-1, 1)

    model = LinearRegression()
    model.fit(X, y)

    next_week = np.array([[len(y)]])
    prediction = model.predict(next_week)[0]

    risk = classify_risk(prediction)

    return {
        "predictedFlow": float(round(prediction, 2)),
        "riskLevel": risk
    }


# ---------- Health Score ----------
@app.post("/health")
def health_score(data: SpringFlow):

    history = data.flowHistory

    if len(history) < 2:
        return {"message": "Not enough data"}

    latest = history[-1]
    first = history[0]

    decline = ((first - latest) / first) * 100
    score = 100 - decline

    score = max(0, min(score, 100))

    if score >= 80:
        status = "Stable"
    elif score >= 50:
        status = "Warning"
    else:
        status = "Critical"

    return {
        "healthScore": round(score, 2),
        "status": status
    }