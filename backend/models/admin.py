from db.database import Base
from sqlalchemy import Column, String


class DBAdmin(Base):
    __tablename__ = "admins"
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
