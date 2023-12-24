from datetime import datetime
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional

from components.models.orm.base import Base

class FollowingsTbl(Base):
    __tablename__ = "followings"

    follower: Mapped[str] = mapped_column(String(255), primary_key=True)
    followee: Mapped[str] = mapped_column(String(255), primary_key=True)
    followed_at: Mapped[Optional[datetime]]
