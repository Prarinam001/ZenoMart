from fastapi import FastAPI

app = FastAPI(title="Ecommerce website")

@app.get("/")
def root():
    return f"I am root endpoint"