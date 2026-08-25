from fastapi import FastAPI
from core.middleware import register_middleware
from core.events import lifespan
from routes.auth import router as auth_router
from routes.products import router as product_router
from routes.testimonials import router as testimonial_router
from routes.contact import router as contact_router
from routes.blog import router as blog_router

# --- APP SETUP ---
app = FastAPI(title="SquarePack API", lifespan=lifespan)

register_middleware(app=app)


@app.get("/")
def read_root():
    return {"message": "Welcome to SquarePack API!"}


app.include_router(auth_router)
# --- PRODUCT CRUD ---
app.include_router(product_router)
# --- TESTIMONIAL CRUD ---
app.include_router(testimonial_router)
# --- CONTACT INQUIRIES ---
app.include_router(contact_router)
# --- BLOG CRUD ---
app.include_router(blog_router)
