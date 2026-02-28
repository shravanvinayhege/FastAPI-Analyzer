from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="API Speed Analyser Backend")

# Allow requests from the browser (any origin during local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    text: str

@app.post("/analyze")
async def analyze(data: InputData):
    result = data.text.upper()   # ← Replace with your real logic here
    return {"output": result, "length": len(data.text)}

@app.get("/")
async def root():
    return {"message": "API Speed Analyser is running ✓"}
