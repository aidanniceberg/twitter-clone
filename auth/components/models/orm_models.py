from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class UserTbl(Base):
    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(255), primary_key=True)
    pw: Mapped[str] = mapped_column(String(255))
