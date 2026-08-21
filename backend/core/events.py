from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text

from db.database import Base, engine
from core.security import seed_users


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

            # Blog SEO columns
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug VARCHAR UNIQUE"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS summary TEXT"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title VARCHAR"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description TEXT"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS keywords VARCHAR"))
            conn.execute(text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS permalink VARCHAR"))

            conn.commit()

        print("Database initialized")

    except Exception as e:
        print(f"Startup DB Error: {e}")

    try:
        seed_users()
        print("Users seeded")

    except Exception as e:
        print(f"Seed Error: {e}")

    yield

    # Shutdown
    print("Application shutting down...")
