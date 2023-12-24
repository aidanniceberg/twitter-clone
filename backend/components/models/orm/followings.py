from datetime import date, datetime
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from components.models.orm.base import Base

class FollowingsTbl(Base):
    __tablename__ = "followings"

    follower: Mapped[str] = mapped_column(String(255), primary_key=True)
    followee: Mapped[str] = mapped_column(String(255), primary_key=True)
