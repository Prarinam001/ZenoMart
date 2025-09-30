from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int
    name: str
    model_config = {"from_attributes": True}


#######################  PRODUCT  ##########################
class ProductBase(BaseModel):
    title: str
    description: str | None = None
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)


class ProductCreate(ProductBase):
    category_ids: list[int] | None = None


class ProductOut(ProductBase):
    id: int
    title: str
    description: str | None
    slug: str
    price: float
    categories: list[CategoryOut] = []
    image_url: str | None = None
    model_config = {"from_attributes": True}
