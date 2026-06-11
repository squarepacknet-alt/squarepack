import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))

with engine.connect() as conn:
    ids = [r[0] for r in conn.execute(text('SELECT id FROM products')).fetchall()]
    print("Product IDs:", ids)
