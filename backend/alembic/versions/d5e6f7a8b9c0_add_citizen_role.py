"""Add missing CITIZEN role safely.

Revision ID: d5e6f7a8b9c0
Revises: c4246839e12d
"""

import uuid
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "d5e6f7a8b9c0"
down_revision: str = "c4246839e12d"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute(
        sa.text(
            """
            INSERT INTO roles (id, name, description)
            SELECT :id, 'CITIZEN', 'Citizen who submits and tracks complaints.'
            WHERE NOT EXISTS (
                SELECT 1 FROM roles WHERE name = 'CITIZEN'
            )
            """
        ).bindparams(id=uuid.uuid4())
    )


def downgrade() -> None:
    # Preserve the role to avoid breaking users assigned to it.
    pass
