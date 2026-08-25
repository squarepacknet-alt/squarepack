import os
import re
import uuid
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_KEY", "")

supabase: Client | None = None
if url and key:
    supabase = create_client(url, key)

def get_storage_bucket() -> str:
    # Priority: Env var > "blogs" > "squarepack-images"
    bucket_env = os.environ.get("SUPABASE_BUCKET")
    if bucket_env:
        return bucket_env
    return "blogs"

def upload_image_to_supabase(file_bytes: bytes, file_name: str, blog_id: str, content_type: str = "image/jpeg") -> str:
    if not supabase:
        raise HTTPException(
            status_code=500, 
            detail="Supabase client not initialized. Missing SUPABASE_URL or SUPABASE_KEY in .env"
        )
    
    # Sanitize file name
    clean_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', file_name)
    unique_name = f"{uuid.uuid4().hex[:8]}_{clean_name}"
    
    target_buckets = [get_storage_bucket(), "squarepack-images"]
    last_error = None

    for bucket in list(dict.fromkeys(target_buckets)):
        try:
            # If bucket is squarepack-images, prepend 'blogs/'
            path = f"blogs/{blog_id}/{unique_name}" if bucket == "squarepack-images" else f"{blog_id}/{unique_name}"
            
            supabase.storage.from_(bucket).upload(
                file=file_bytes, 
                path=path, 
                file_options={"content-type": content_type or "image/jpeg", "upsert": "true"}
            )
            
            url = supabase.storage.from_(bucket).get_public_url(path)
            return url
        except Exception as e:
            last_error = e
            # Try next bucket in list if Bucket not found
            if "Bucket not found" in str(e) or "404" in str(e):
                continue
            else:
                raise HTTPException(status_code=500, detail=f"Storage upload error: {str(e)}")

    raise HTTPException(
        status_code=500, 
        detail=f"Storage error: Bucket '{get_storage_bucket()}' was not found. Please create a public bucket named 'blogs' or 'squarepack-images' in Supabase. Details: {str(last_error)}"
    )
