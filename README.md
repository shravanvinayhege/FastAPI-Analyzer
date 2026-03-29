<div align="center">

# ⚡ FastAPI Analyzer

**A browser-based live inspector for FastAPI backends — explore routes, test endpoints, and debug responses in real time.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Website-00b4d8?style=for-the-badge)](https://shravanvinayhege.github.io/FastAPI-Analyzer/)
[![GitHub Stars](https://img.shields.io/github/stars/shravanvinayhege/FastAPI-Analyzer?style=for-the-badge&color=f59e0b)](https://github.com/shravanvinayhege/FastAPI-Analyzer/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

<br/>



</div>

---

## 🤔 What is FastAPI Analyzer?

FastAPI Analyzer is a **lightweight, zero-dependency frontend tool** that connects directly to any running FastAPI server and gives you a clean, interactive interface to:

- **Auto-discover** all your API routes by reading the `/openapi.json` schema
- **Send real HTTP requests** (GET, POST, PUT, DELETE, PATCH) from the browser
- **Inspect responses** — status codes, headers, JSON bodies, and errors
- **Debug CORS and connection issues** without touching Postman or curl

Think of it as a **minimal Swagger UI you host yourself** — but faster, simpler, and designed for local development workflows.

---

## 🧠 How It Works

```
Your Browser (index.html + script.js)
        │
        │  HTTP requests via Fetch API
        ▼
FastAPI Server (uvicorn main:app --reload)
        │
        │  Returns JSON + OpenAPI schema
        ▼
FastAPI Analyzer renders routes, request forms & responses
```

1. You enter your FastAPI server's base URL (default: `http://localhost:8000`)
2. The tool fetches `/openapi.json` to discover all available endpoints automatically
3. You select a route, fill in any required parameters or body, and hit **Send**
4. The response is displayed with syntax highlighting, status code, and timing info

> **No build step. No npm install. No backend of its own.** Just open `index.html` in your browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Route Discovery** | Automatically reads your FastAPI OpenAPI spec to list all endpoints |
| 📡 **Live Request Sender** | Test GET, POST, PUT, DELETE, PATCH requests directly from the UI |
| 🎨 **Response Viewer** | Pretty-printed JSON responses with status codes and headers |
| 🛡️ **CORS Ready** | Works seamlessly with FastAPI's built-in `CORSMiddleware` |
| ⚙️ **Configurable URL** | Point it at any local or remote FastAPI server |
| 🪶 **Zero Dependencies** | Pure HTML, CSS, and vanilla JavaScript — no frameworks |
| 🔄 **Hot Reload Friendly** | Works perfectly alongside `uvicorn --reload` development mode |

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/shravanvinayhege/FastAPI-Analyzer.git
cd FastAPI-Analyzer
```

### 2. Start your FastAPI server

Make sure you have a FastAPI app with CORS enabled. Your `main.py` should include:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
```

Then run it:

```bash
uvicorn main:app --reload
```

Your server will be available at `http://localhost:8000`.

### 3. Open the analyzer

Simply open `index.html` in your browser — no server needed for the frontend:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or visit the **[hosted live demo](https://shravanvinayhege.github.io/FastAPI-Analyzer/)** and point it at your local server.

---

## 📁 Project Structure

```
FastAPI-Analyzer/
├── index.html       # Main UI — the analyzer interface
├── style.css        # Styling — keep in the same folder as index.html
├── script.js        # Core logic — fetch, render routes, send requests
└── README.md        # You are here
```

> ⚠️ All three files (`index.html`, `style.css`, `script.js`) **must be in the same directory** for the app to load correctly.

---

## ⚙️ Configuration

By default, the analyzer points to `http://localhost:8000`. To change this:

1. Open `script.js`
2. Find the line:
   ```js
   const DEFAULT_API_URL = "http://localhost:8000";
   ```
3. Update it to match your server's address

---

## 🛠️ Troubleshooting

### ❌ "Could not connect to FastAPI server"

- Make sure your FastAPI server is running:
  ```bash
  uvicorn main:app --reload
  ```
- Verify the URL in the analyzer matches your server's address and port
- Check that your firewall isn't blocking `localhost:8000`

### ❌ CORS error in browser console

- Ensure `CORSMiddleware` is present in your `main.py` (see Quick Start above)
- Make sure you haven't accidentally removed or commented it out
- For stricter setups, replace `allow_origins=["*"]` with your specific origin

### ❌ `index.html` shows no styles

- All three files must be in **the same folder**: `index.html`, `style.css`, `script.js`
- Do not move or rename them individually

### ❌ Port 8000 already in use

Run your server on a different port:

```bash
uvicorn main:app --reload --port 8001
```

Then update `DEFAULT_API_URL` in `script.js`:

```js
const DEFAULT_API_URL = "http://localhost:8001";
```

---

## 🔬 Under the Hood

FastAPI automatically generates an **OpenAPI 3.0 schema** at `/openapi.json` for any app you build. FastAPI Analyzer reads this schema to:

- List every route with its HTTP method and path
- Show required path parameters, query parameters, and request body shape
- Display expected response models

This means it works with **any FastAPI app** — no configuration on the server side beyond enabling CORS.

---

## 🌐 Deploying the Analyzer

Since FastAPI Analyzer is a static frontend, you can host it anywhere:

| Platform | Command / Notes |
|---|---|
| **GitHub Pages** | Push to `gh-pages` branch or enable Pages in repo settings |
| **Netlify** | Drop the folder into [netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `vercel deploy` from the project folder |
| **Local file** | Just open `index.html` directly in your browser |

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature idea:

1. [Open an issue](https://github.com/shravanvinayhege/FastAPI-Analyzer/issues) to discuss it
2. Fork the repo and create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Shravan Vinay Hege](https://github.com/shravanvinayhege)

⭐ If this project helped you, consider giving it a star!

</div>
<img src="https://github.com/user-attachments/assets/ddb2d84d-1883-4873-82b6-d5749ccfabc3" width="800" alt="FastAPI Analyzer Screenshot" />
