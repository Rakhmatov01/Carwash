from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "user", "Oddiy foydalanuvchi"
        PARTNER = "partner", "Hamkor"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)
