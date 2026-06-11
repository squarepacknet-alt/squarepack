import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env")

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    conn.execute(text("TRUNCATE TABLE products"))
    conn.commit()

print("✅ All products deleted successfully.")