from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import AsyncAttrs

class base(AsyncAttrs, DeclarativeBase):
    pass