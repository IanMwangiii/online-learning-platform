"""Manual migration for adding username column

Revision ID: 5a30d0686371
Revises: 4bd6bd0d272f
Create Date: 2024-08-07 01:07:32.849534

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a30d0686371'
down_revision = '4bd6bd0d272f'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
