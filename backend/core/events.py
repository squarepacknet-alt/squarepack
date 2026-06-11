from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text

from db.database import Base, engine
from core.security import seed_admin


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Startup
    try:
        Base.metadata.create_all(bind=engine)

        with engine.connect() as conn:

            conn.execute(
                text(
                    "ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE"
                )
            )

            conn.execute(
                text("ALTER TABLE products ADD COLUMN IF NOT EXISTS details JSON")
            )

            conn.execute(
                text("ALTER TABLE products ADD COLUMN IF NOT EXISTS details_ar JSON")
            )

            conn.commit()

        print("Database initialized")

    except Exception as e:
        print(f"Startup DB Error: {e}")

    try:
        seed_admin()
        print("Admin seeded")

    except Exception as e:
        print(f"Seed Error: {e}")

    yield

    # Shutdown
    print("Application shutting down...")
