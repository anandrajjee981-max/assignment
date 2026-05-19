# Prowider Mini Lead Distribution System

A simplified lead generation and provider distribution platform inspired by real-world systems like Prowider.

## 🚀 Project Overview

This project allows customers to submit service enquiries which are automatically distributed to providers based on:

* Mandatory assignment rules
* Fair provider allocation
* Monthly provider quota
* Duplicate lead prevention
* Real-time backend persistence

The main focus of this implementation is **backend engineering correctness**, provider allocation logic, and database consistency.

---

# 🛠 Tech Stack

## Frontend

* React.js
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# 📂 Project Structure

## Backend (Structured)

```txt
backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controller/
│   │   └── lead.controller.js
│   │
│   ├── models/
│   │   ├── lead.model.js
│   │   ├── provider.model.js
│   │   ├── assign.model.js
│   │   └── event.model.js
│   │
│   ├── routes/
│   │   └── lead.route.js
│   │
│   └── app.js
│
├── server.js
└── .env
```

## Frontend (Simple Structure)

```txt
frontend/
│
├── src/
│   ├── components/
│   │   └── Form.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
```

---

# ⚙️ Core Features

## ✅ Lead Submission

Customers can submit:

* Name
* Phone Number
* City
* Service Type
* Description

---

## ✅ Duplicate Prevention

A customer cannot create another lead for the same service.

### Example

Allowed:

```txt
9999999999 → Service 1
9999999999 → Service 2
```

Not Allowed:

```txt
9999999999 → Service 1 (again)
```

This is enforced using a MongoDB compound unique index.

---

# ✅ Provider Allocation Logic

Each lead is assigned to exactly 3 providers.

## Mandatory Rules

| Service   | Mandatory Providers     |
| --------- | ----------------------- |
| Service 1 | Provider 1              |
| Service 2 | Provider 5              |
| Service 3 | Provider 1 & Provider 4 |

---

## Fair Allocation

Remaining providers are selected using:

* Lowest assigned count first
* Monthly quota validation
* Unique provider assignment

This prevents repeated provider favoritism.

---

# ✅ Monthly Quota System

Each provider has:

```txt
monthlyQuota = 10
```

A provider cannot receive leads after reaching quota.

---

# ✅ Lead Completion System

Leads can be marked:

* pending
* completed

Provider assignment counts are updated accordingly.

---

# ✅ Webhook Simulation

Webhook route simulates external system actions such as:

* quota reset
* provider refresh logic

---

# 🔐 Concurrency Handling

The system attempts to reduce duplicate provider allocation by:

* validating quota before assignment
* checking provider availability dynamically
* assigning unique providers only

---

# 🧪 API Routes

## Create Lead

```http
POST /api/auth/lead
```

## Dashboard

```http
GET /api/auth/dashboard
```

## Total Leads

```http
GET /api/auth/total
```

## Complete Lead

```http
PATCH /api/auth/complete/:id
```

## Reset Quota Webhook

```http
POST /api/auth/webhook/reset
```

---

# ▶️ Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 3. Configure Environment Variables

Create `.env` inside backend:

```env
MONGO_URI=your_mongodb_uri
PORT=3000
```

---

## 4. Start Backend

```bash
npm run dev
```

---

## 5. Start Frontend

```bash
npm run dev
```

---

# 📌 Important Notes

* Main focus of this project was backend architecture and allocation logic.
* Frontend was intentionally kept simple due to academic exam schedule and prioritization of backend engineering requirements.
* The system emphasizes correctness and persistence over UI complexity.

---

# 👨‍💻 Author

Anand Raj
