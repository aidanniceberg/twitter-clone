from datetime import datetime
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional

from components.models.orm.base import Base

class PostLikeTbl(Base):
    __tablename__ = "post_like"

    post_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(255), primary_key=True)
    liked_at: Mapped[Optional[datetime]]
