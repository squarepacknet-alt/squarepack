from fastapi import FastAPI
from core.middleware import register_middleware
from core.events import lifespan
from routes.admin import router as admin_router
from routes.products import router as product_router
from routes.testimonials import router as testimonial_router
from routes.contact import router as contact_router
from supabase import create_client, Client

# --- APP SETUP ---
app = FastAPI(title="SquarePack API", lifespan=lifespan)

SUPABASE_URL = "https://ubsmrihzrvqmdvzfqoyu.supabase.co"
PUBLIC_KEY = "sb_publishable_41JTLgwqSPuhrJ0-dMU86A_5ZgyfH3v"
BUCKET_NAME = "squarepack-images"

supabase: Client = create_client(SUPABASE_URL, PUBLIC_KEY)


register_middleware(app=app)


@app.get("/")
def read_root():
    return {"message": "Welcome to SquarePack API!"}

BUCKET_URL = "https://squarepack-images.s3.ap-south-1.amazonaws.com"

@app.get("/images")
def get_images():
    files = supabase.storage.from_(BUCKET_NAME).list()
    urls = [{"name": f["name"], "url": supabase.storage.from_(BUCKET_NAME).get_public_url(f["name"])} for f in files if (f["name"] != ".emptyFolderPlaceholder")]
    return {"images": urls, "total": len(urls)}


app.include_router(admin_router)
# --- PRODUCT CRUD ---
app.include_router(product_router)
# --- TESTIMONIAL CRUD ---
app.include_router(testimonial_router)
# --- CONTACT INQUIRIES ---
app.include_router(contact_router)
