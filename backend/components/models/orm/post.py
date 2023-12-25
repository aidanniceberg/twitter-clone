from datetime import datetime
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional

from components.models.orm.base import Base

class PostTbl(Base):
    __tablename__ = "post"

    id: Mapped[int] = mapped_column(primary_key=True)
    author: Mapped[str] = mapped_column(ForeignKey("user.username"))
    content: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime]
    response_to: Mapped[Optional[int]] = mapped_column(ForeignKey("post.id"))
