from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List

from core.security import require_editor_role, require_admin_role
from db.database import get_db
from schemas.blog import BlogCreate, BlogUpdate, BlogResponse
from services.blog_service import BlogService
from utils.supabase_client import upload_image_to_supabase

router = APIRouter(
    prefix="/api/blogs",
    tags=["Blogs"],
)

@router.get("", response_model=List[BlogResponse])
def get_blogs(db: Session = Depends(get_db)):
    service = BlogService(db)
    return service.get_all()

@router.get("/slug/{slug}", response_model=BlogResponse)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    service = BlogService(db)
    return service.get_by_slug(slug)

@router.get("/{blog_id}", response_model=BlogResponse)
def get_blog(blog_id: str, db: Session = Depends(get_db)):
    service = BlogService(db)
    return service.get_by_id(blog_id)

@router.post("", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    _user=Depends(require_editor_role),
):
    service = BlogService(db)
    return service.create(blog)

@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_id: str,
    updated_blog: BlogUpdate,
    db: Session = Depends(get_db),
    _user=Depends(require_editor_role),
):
    service = BlogService(db)
    return service.update(blog_id, updated_blog)

@router.delete("/{blog_id}")
def delete_blog(
    blog_id: str,
    db: Session = Depends(get_db),
    _user=Depends(require_admin_role),
):
    service = BlogService(db)
    return service.delete(blog_id)

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    blog_id: str = Form(...),
    _user=Depends(require_editor_role),
):
    file_bytes = await file.read()
    url = upload_image_to_supabase(
        file_bytes=file_bytes,
        file_name=file.filename,
        blog_id=blog_id,
        content_type=file.content_type
    )
    return {"url": url}
