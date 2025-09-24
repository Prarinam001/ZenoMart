uv add "fastapi[standard]" sqlalchemy[asyncio] aiomysql alembic python-decouple python-jose[cryptography] passlib[bcrypt] cryptography

fastapi dev app/main.py

// for alembic set up
alembic init -t async alembic