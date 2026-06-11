from fastapi import APIRouter, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

router = APIRouter()


@router.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"DEBUG: Validation Error for {request.method} {request.url}")
    print(f"DEBUG: Errors: {exc.errors()}")
    print(f"DEBUG: Body: {exc.body}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": str(exc.body)},
    )


@router.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    import traceback

    print(f"CRITICAL ERROR: {type(exc).__name__}: {str(exc)}")
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "error": str(exc)},
    )
