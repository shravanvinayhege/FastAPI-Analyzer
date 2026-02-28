Could not connect to FastAPI server"


→ Make sure uvicorn main:app --reload is running in your terminal.
CORS error in browser console

→ The CORSMiddleware in main.py handles this. Ensure you haven't removed it.
index.html shows no styles

→ Make sure style.css, script.js, and index.html are all in the same folder.
Port 8000 already in use

→ Run on a different port: uvicorn main:app --reload --port 8001
→ Then update DEFAULT_API_URL in script.js to match.
<p align="center">
  <image src="https://github.com/user-attachments/assets/ddb2d84d-1883-4873-82b6-d5749ccfabc3",width="800">
</p>
