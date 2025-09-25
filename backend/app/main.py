from fastapi import FastAPI
from app.account.routers import router as account_router
app = FastAPI(title="Ecommerce website")

@app.get("/")
def root():
    return f"I am root endpoint"

app.include_router(account_router)