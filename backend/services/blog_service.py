from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.blog import DBBlog
from schemas.blog import BlogCreate, BlogUpdate
import uuid
import re


def _make_unique_slug(db: Session, base_slug: str, exclude_id: str = None) -> str:
    """Ensure slug is unique by appending a counter if needed."""
    slug = base_slug
    counter = 1
    while True:
        query = db.query(DBBlog).filter(DBBlog.slug == slug)
        if exclude_id:
            query = query.filter(DBBlog.id != exclude_id)
        if not query.first():
            return slug
        slug = f"{base_slug}-{counter}"
        counter += 1


class BlogService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(DBBlog).order_by(DBBlog.created_at.desc()).all()

    def get_by_id(self, blog_id: str):
        blog = self.db.query(DBBlog).filter(DBBlog.id == blog_id).first()
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        return blog

    def get_by_slug(self, slug: str):
        blog = self.db.query(DBBlog).filter(DBBlog.slug == slug).first()
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        return blog

    def create(self, blog: BlogCreate):
        new_id = str(uuid.uuid4())
        # Ensure slug uniqueness
        base_slug = blog.slug or re.sub(r"[\s_]+", "-", blog.title.lower().strip())
        unique_slug = _make_unique_slug(self.db, base_slug)

        db_blog = DBBlog(
            id=new_id,
            title=blog.title,
            slug=unique_slug,
            summary=blog.summary,
            content=blog.content,
            cover_image=blog.cover_image,
            author=blog.author,
            is_published=blog.is_published,
            meta_title=blog.meta_title,
            meta_description=blog.meta_description,
            keywords=blog.keywords,
            permalink=blog.permalink,
        )
        self.db.add(db_blog)
        self.db.commit()
        self.db.refresh(db_blog)
        return db_blog

    def update(self, blog_id: str, updated_blog: BlogUpdate):
        db_blog = self.db.query(DBBlog).filter(DBBlog.id == blog_id).first()
        if not db_blog:
            raise HTTPException(status_code=404, detail="Blog not found")

        update_data = updated_blog.model_dump(exclude_unset=True)

        # If title changed but slug not explicitly set, regenerate slug
        if "title" in update_data and "slug" not in update_data:
            base_slug = re.sub(r"[\s_]+", "-", update_data["title"].lower().strip())
            update_data["slug"] = _make_unique_slug(self.db, base_slug, exclude_id=blog_id)
        elif "slug" in update_data:
            update_data["slug"] = _make_unique_slug(self.db, update_data["slug"], exclude_id=blog_id)

        for key, value in update_data.items():
            setattr(db_blog, key, value)

        self.db.commit()
        self.db.refresh(db_blog)
        return db_blog

    def delete(self, blog_id: str):
        db_blog = self.db.query(DBBlog).filter(DBBlog.id == blog_id).first()
        if not db_blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        self.db.delete(db_blog)
        self.db.commit()
        return {"message": "Blog deleted successfully"}
