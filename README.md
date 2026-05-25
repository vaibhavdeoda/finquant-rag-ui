# 📊 FinQuant AI UI (Frontend)

The interactive agentic user interface for the FinQuant RAG platform. Built using Next.js, TypeScript, and Tailwind CSS to deliver an ultra-clean, minimalist dark-themed execution hub for financial document analysis.

---

## 📺 Application Demo

See the system ingest financial reports and answer questions in real-time.

### Watch the Demo
* **Video Walkthrough:** 📥 **[Click here to play `FinQuant AI Demo`](./FinQuant AI Demo.mov)**
* Please download the video file to play if it doesn't play in the browser.

---  

## 🛠️ Architecture & Features

* **Execution Hub:** Optimized layout contrasting user prompts (bright white) from agent analysis outputs (soft slate).
* **Context Storage Monitor:** A sleek asset drop-zone that stages `.pdf` and  `.txt` files using native input ref handling for infinite swapping.
* **Persistent Layout States:** Pre-expanded workspace components keeping logs in view right from initial page initialization.

---

## 🚀 Getting Started

### 1. Installation
Navigate into the frontend project root and install the dependencies:

```bash
cd finquant-rag-ui
npm install
```

### 2. Configure the API Target
Ensure your local environment routes point directly to your running FastAPI instance. By default, components stream data payloads straight to:
* **Query Route:** `http://localhost:8000/ask`
* **Upload Route:** `http://localhost:8000/upload`

### 3. Launch Development Server
Boot up your hot-reloading workspace environment:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your dashboard.

---

## 📁 Key File Map

```text
├── app/
│   ├── layout.tsx     # Main application shell & metadata defaults
│   ├── page.tsx       # Core Execution Hub (Query Interface)
│   └── upload/
│       └── page.tsx   # Asset drop-zone & chunk parsing pipeline
├── components/
│   └── ChatInterface.tsx # Dedicated input bar module
```

---

## 🛠️ Production Build
To build and optimize the application for production deployment (stripping away local development indicators):

```bash
npm run build
npm start
```
