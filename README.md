
# 🚗 AutoEsti – Vehicle Damage Estimation Platform

**AutoEsti** is a web application that uses **Vertex AI** to **automatically estimate vehicle repair costs** from damage descriptions or images. Designed to **shorten response times** in stressful situations, GenEsti gives users fast, reliable estimates to help them make informed decisions.

---

## 🔍 Overview

When people face vehicle damage—after accidents or incidents—getting a repair estimate quickly can be stressful and time-consuming. **AutoEsti** aims to cut through that delay by offering:

* **Instant damage estimate suggestions**
* **Accurate cost predictions**
* **Reduction in manual evaluation time**

Powered by **Google Cloud’s Vertex AI**, it seamlessly blends UI and AI to provide actionable results.

---

## 🛠 Key Features

* 📤 **Image/Text Upload**
  Users can upload damage photos or detailed problem descriptions.

* 🤖 **Vertex AI Integration**
  Damage is analyzed automatically based on trained models hosted in Vertex AI.

* 🧮 **Cost Estimation**
  The system returns a comprehensive repair cost estimate, helping users plan ahead.

* 🔄 **Feedback Loop**
  Users can confirm or adjust estimates, continuously improving the model’s accuracy.

---

## 📋 Tech Stack

* **Frontend**: (Angular)
* **AI**: Google Vertex AI (video analysis, image processing, ML predictions)

---

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/ChitraRajendran2021/GenEsti.git
   cd GenEsti
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt  # Python backend
   # or
   npm install                     # Node.js frontend
   ```

3. **Configure environment**
   Add your Vertex AI credentials and model endpoint in `.env`:

   ```
   VERTEX_PROJECT_ID=...
   VERTEX_REGION=...
   VERTEX_MODEL_ID=...
   ```

4. **Run locally**

   ```bash
   # For backend
   python server.py
   # For frontend
   npm start
   ```

5. **Use the UI**
   Upload damage photos or input details and receive an estimated repair cost instantly.

## 🎯 Use Cases & Benefits

* **Collision victims** need quick repair estimates for insurance claims.
* **Mechanics** want faster pre-booking estimates.
* **Fleet operators** require rapid assessments for scheduling maintenance.
* **Insurance agents** benefit from improved claim triage speed.

## 🌱 Why It Matters

* **Saves Time:** Eliminate manual assessment delays.
* **Empowers Users:** Helps people make informed decisions in difficult times.
* **Scalable:** Leverages Vertex AI for a production-ready estimation tool.


## 📈 Next Steps

* Train model on a **larger dataset** for improved accuracy.
* Add **multi-angle image support** for better damage detection.
* Enable **real-time escalation** (e.g. video walkthrough via live stream).
* Integrate **insurance APIs** for claim automation.


## 🤝 Contributing

Want to help? Contributions are welcome!
Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your improvements (`git commit -m 'Add feature'`)
4. Push and open a Pull Request


## 👤 Author

**Chitra Rajendran** 
[https://github.com/ChitraRajendran2021](https://github.com/ChitraRajendran2021)

