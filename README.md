# 🌿 NeuraGreen - AI-Powered Carbon Footprint Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org)

---

## 📌 Overview

**NeuraGreen** is a full-stack web application that:
1. Lets users input or scrape Amazon product data
2. Uses **Gemini AI** to analyze the product's carbon footprint
3. Recommends top 3 lower-carbon alternatives based on the analysis

---

## 🛠️ Tech Stack

| Component       | Technology           | Purpose                              |
|-----------------|----------------------|--------------------------------------|
| Frontend        | React + Vite         | Fast UI & SPA structure              |
| Backend         | Python + FastAPI     | API layer for scraping & AI analysis |
| AI Model        | Gemini API (Google)  | Carbon footprint estimation          |
| Scraper         | BeautifulSoup/Selenium| Amazon product scraping              |
| CSV Logging     | Pandas               | Save scraped product analysis        |

---

## 🔧 Installation

### 🔁 Clone & Setup

```bash
git clone https://github.com/yourusername/NeuraGreen.git
cd NeuraGreen
````

### 📦 Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 💻 Frontend Setup

```bash
cd ../
npm install
```

---

## 🔐 Configuration

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY="your_gemini_api_key"    #🤖 Gemini API Key → Get your key for Google AI (https://makersuite.google.com/app/apikey)
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_api_key"   #🔑 Get your Clerk API keys at the [Clerk Dashboard](https://dashboard.clerk.dev)  
→ Go to your application → **API Keys** section

```

You can also configure backend environment variables (if needed) in `server/.env`.

---

## 🚀 Running the App

### 🖥️ Start Frontend (React)

```bash
npm run dev
```

### 🧠 Start Backend (FastAPI)

```bash
cd server
uvicorn main:app --reload
```

---

## 📂 Project Structure

```
NeuraGreen/
├── public/
│   └── vite.svg
├── src/
│   ├── api/                 # API services
│   ├── assets/              # Static images/icons
│   ├── components/          # UI Components
│   ├── pages/               # Route Pages (Home, Results)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── routers/
│   │   ├── analyze.py       # API route for analysis
│   ├── services/
│   │   ├── gemini.py        # Gemini API integration
│   │   ├── scraper.py       # Amazon scraping logic
│   ├── main.py              # FastAPI entry point
│   ├── requirements.txt
├── Output/
│   └── scraped_products.csv # CSV file with outputs
├── .env
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🌟 Key Features

### 🔍 Product Scraping Logic (`scraper.py`)

```python
def scrape_product_data(url: str) -> dict:
    # Extracts title, price, and product attributes
    soup = BeautifulSoup(requests.get(url).text, 'html.parser')
    title = soup.find("span", {"id": "productTitle"}).text.strip()
    return {"title": title}
```

### 🤖 AI-Based Carbon Analysis (`gemini.py`)

```python
def analyze_product_footprint(title: str) -> str:
    prompt = f"Estimate carbon footprint of {title}"
    response = gemini.generate_content(prompt)
    return response.text
```

---

## 🧪 Example Usage

Frontend calls:

```javascript
// src/api/productApi.js
export const analyzeProduct = async (title) => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return await response.json();
};
```

---

## 🧪 Output:

![image](https://github.com/user-attachments/assets/cc39f350-f4c4-423d-9efd-5aafa8cd54b9)


---

## 📜 License

MIT © \[Tanishq Shinde]

---

> Crafted with 🌱 by Tanishq using React, FastAPI, and Gemini AI

