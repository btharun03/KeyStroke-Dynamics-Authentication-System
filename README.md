# 🔐 Keystroke Dynamics Authentication System

## 📖 Overview

The **Keystroke Dynamics Authentication System** is a biometric-based authentication solution that enhances login security by analyzing a user's typing behavior. It ensures that only authorized users, recognized by their unique keystroke patterns, can access the system, even if the correct password is used by an imposter.

This project uses a full-stack architecture built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**, and incorporates a Python-based **Machine Learning model** to verify keystroke dynamics.

---

## 🚀 Key Features

* ✅ Combines password and biometric (keystroke) data
* 🧠 ML-driven verification using timing-based features
* 🔄 Tolerant pattern matching to allow minor variations
* 🔐 Prevents unauthorized access from users who know the password
* 💬 Informative feedback on authentication attempts
* 🌐 Responsive, modern user interface

---

## 🛠️ Technologies Used

### Frontend:

* React.js
* Tailwind CSS

### Backend:

* Node.js
* Express.js

### Machine Learning:

* Python (scikit-learn, NumPy, pandas)
* Serialized ML model using `.pkl`

### Database:

* MongoDB

---

## 🔎 System Workflow

1. **Registration Phase**:

   * User types the same password multiple times
   * System records keystroke timing data (hold time, flight time, latency)

2. **Model Training**:

   * Collected data is used to train a machine learning model
   * Model learns typical timing patterns for each user

3. **Login Phase**:

   * User inputs the password
   * Timing data is captured again and sent to the ML model
   * The model evaluates whether the input pattern matches the trained pattern

---

## 🧠 Machine Learning Details

* **Features Used**:

  * Hold Time: Duration between key down and key up
  * Flight Time: Time between key up of one key and key down of next
  * Latency: Time difference between successive key presses

* **Models Explored**:

  * Random Forest
  * SVM
  * MLP Classifier

* **Evaluation**:

  * Accuracy, Precision, Recall
  * Balanced tolerance to handle natural variations in typing

---

## 🔐 Security Benefits

* Prevents login from stolen credentials if typing pattern is different
* Reduces risk of brute force and replay attacks
* Adds an invisible layer of protection without extra user effort

---

## 📌 Potential Use Cases

* Secure access to sensitive enterprise applications
* MFA alternative or enhancement
* Banking and financial systems
* Academic or research portals requiring strict authentication

---

## 📊 Performance Metrics

* **Training Accuracy**: \~95% (varies with dataset size and model)
* **False Acceptance Rate (FAR)**: Low (tunable threshold)
* **False Rejection Rate (FRR)**: Moderate (depends on variation in user typing)
* **Evaluation Method**: k-Fold Cross Validation and real-world typing tests

---

## 🧩 Limitations & Challenges

* Users with inconsistent typing may face rejections
* Requires multiple samples per user for reliable model training
* Sensitivity to keyboard layout and device change
* Noise in data due to background processes or lag

---

## 🚧 Future Enhancements

* Integration with mobile platforms (touchscreen typing behavior)
* Federated learning for decentralized user data training
* Real-time anomaly detection using streaming data
* Visual feedback for users during registration
* Custom dashboards for administrators to monitor activity
