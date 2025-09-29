from pydantic import BaseModel, Field

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: int
    name: str
    model_config={
        "from_attributes": True
    }
