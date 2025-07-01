import sys
import json
import pickle
import numpy as np

# Load model and label encoder
model = pickle.load(open("model/saved_model/keystroke_auth_model.pkl", "rb"))
label_encoder = pickle.load(open("model/saved_model/label_encoder.pkl", "rb"))
scaler = pickle.load(open("model/saved_model/scaler.pkl", "rb"))

def predict_user(features):
    data = np.array(features).reshape(1, -1)
    data_scaled = scaler.transform(data)
    predicted_label = model.predict(data_scaled)[0]
    return predicted_label

if __name__ == "__main__":
    # sys.argv[1] = JSON string of features
    # sys.argv[2] = true label (encoded ID)
    keystroke_data = json.loads(sys.argv[1])
    true_label = int(sys.argv[2])

    predicted_label = predict_user(keystroke_data)

    if predicted_label == true_label:
        print("genuine")
    else:
        print("imposter")
