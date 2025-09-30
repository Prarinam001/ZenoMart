from fastapi import FastAPI
from app.account.routers import router as account_router
from app.product.routers.category import router as category_router
from app.product.routers.product import router as product_router

app = FastAPI(title="Ecommerce website")


@app.get("/")
def root():
    return f"I am root endpoint"


app.include_router(account_router)
app.include_router(category_router)
app.include_router(product_router)
