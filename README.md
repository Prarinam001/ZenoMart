# ZenoMart
uv add "fastapi[standard]" sqlalchemy[asyncio] aiomysql alembic python-decouple python-jose[cryptography] passlib[bcrypt] cryptography

fastapi dev app/main.py

// for alembic set up
alembic init -t async alembic

//for create migration files table
alembic revision --autogenerate -m "create table"

// for create tables
alembic upgrade head