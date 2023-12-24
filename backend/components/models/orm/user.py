from datetime import date, datetime
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from components.models.orm.base import Base

class UserTbl(Base):
    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(255), primary_key=True)
    email: Mapped[str] = mapped_column(String(255))
    birthday: Mapped[date]
    bio: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime]
