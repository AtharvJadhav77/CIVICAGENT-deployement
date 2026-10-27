"""add verification supersession

Revision ID: c4246839e12d
Revises: a4f5b6c7d8e9
Create Date: 2026-10-24 21:56:32.976536
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'c4246839e12d'
down_revision: Union[str, None] = 'a4f5b6c7d8e9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "work_order_verifications",
        sa.Column("superseded", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "work_order_verifications",
        sa.Column("superseded_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index(
        op.f("ix_work_order_verifications_superseded"),
        "work_order_verifications",
        ["superseded"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_work_order_verifications_superseded"),
        table_name="work_order_verifications",
    )
    op.drop_column("work_order_verifications", "superseded_at")
    op.drop_column("work_order_verifications", "superseded")
