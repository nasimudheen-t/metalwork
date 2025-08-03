#  Metal Rate Management System

This project allows users to manage **metal rates** (e.g., Gold, Silver, Platinum) based on **metal type** and **purity**. It supports adding new rate entries, viewing the latest rate, and preserving rate history.

##  Features

-  **Add new rate** based on metal and purity.
-  Select a **rate date** while creating the rate.
-  View the **latest saved rate** if available.
-  All new rate entries are stored as **separate documents** to preserve historical data.
-  Prevents overwriting previous entries.

##  Tech Stack

- **Frontend**: React + MUI (Material UI)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

---

##  Project Structure

### Frontend

- `RateForm.jsx`: Main component for submitting new metal rates and viewing the latest rate.
- `MetalRateViewer.jsx`: (Optional) Displays the full rate history for selected metal and purity.
- `Autocomplte.js`: Metal options list for Autocomplete input.

### Backend

- `POST /api/create-purity`: Adds a new metal rate.
- `GET /api/latest-rate?metal=Gold&purity=916`: Fetches the most recent rate based on metal and purity.

---

## 🛠 Setup Instructions

### 1. Backend

```bash
cd backend
npm install
npm start
