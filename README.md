# 🌿 NeuraGreen - AI-Powered Carbon Footprint Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org)

## 📌 Overview
A Chrome extension that:
1. Authenticates users via Clerk Service
2. Scrapes current Amazon product page
3. Calculates carbon footprint using Gemini AI
4. Recommends top 3 lower-carbon alternatives

## 🛠️ Tech Stack
| Component       | Technology          | Purpose                          |
|-----------------|---------------------|----------------------------------|
| Frontend        | React + Vite        | Fast, modern UI                  |
| Authentication  | Clerk               | Secure user management           |
| Scraping        | Chrome API + DOM    | Extract product data             |
| AI Analysis     | Gemini API          | Carbon footprint estimation      |
| Backend         | Firebase Functions  | Serverless API endpoints         |

## 🔧 Installation
```bash
# Clone repository
git clone https://github.com/yourusername/neuragreen-extension.git
cd neuragreen-extension

# Install dependencies
npm install
```

## 🔐 Configuration
1. Create `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_GEMINI_API_KEY=your_gemini_key
```

## 🚀 Building & Loading
```bash
# Development
npm run dev

# Production build
npm run build

# Load in Chrome:
1. Go to chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the /dist folder
```

## 📂 Project Structure
```
neuragreen-extension/
├── public/
│   ├── manifest.json        # Extension config
│   └── icons/               # Extension icons
├── src/
│   ├── background/          # Service worker
│   ├── content/             # Page interaction
│   ├── components/          # React UI
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main component
│   └── index.js             # Entry point
├── .env.example             # Env template
└── README.md                # This file
```

## 🌟 Key Features
```javascript
// content.js - Product Scraping
const getProductData = () => ({
  title: document.querySelector('#productTitle')?.innerText,
  category: [...document.querySelectorAll('.nav-a-content')].map(el => el.innerText),
  asin: new URLSearchParams(location.search).get('asin')
});

// background.js - AI Processing
chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === "ANALYZE_PRODUCT") {
    const prompt = `Estimate carbon footprint for ${request.product.title}`;
    const response = await geminiAPI.generateContent(prompt);
    return response;
  }
});
```

## 📜 License
MIT © [Tanishq Shinde]

---
