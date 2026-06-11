import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))

with engine.connect() as conn:
    print("Running migration...")
    conn.execute(text('ALTER TABLE products ADD COLUMN IF NOT EXISTS details JSON'))
    conn.execute(text('ALTER TABLE products ADD COLUMN IF NOT EXISTS details_ar JSON'))
    conn.commit()
    print("Migration successful")
