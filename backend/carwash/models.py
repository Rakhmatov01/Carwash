from django.db import models
from django.conf import settings
from django.db.models import Avg, Count


class Carwash(models.Model):
    """
    Moyka (Carwash)
    - owner: hamkor (partner)
    - image: rasm (ixtiyoriy)
    - rating_avg / rating_count: userlar qo‘ygan bahodan hisoblanadi
    """
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to="moykalar/",null=True,blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="carwashes")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def rating_avg(self) -> float:
        """
        O'rtacha baho (1..5)
        """
        val = self.ratings.aggregate(a=Avg("score"))["a"]
        return float(val) if val is not None else 0.0

    @property
    def rating_count(self) -> int:
        """
        Nechta baho qo'yilgan
        """
        val = self.ratings.aggregate(c=Count("id"))["c"]
        return int(val) if val is not None else 0

    def __str__(self):
        return self.name


class CarwashService(models.Model):
    """
    Moyka tariflari / xizmatlari (narxlar)
    Hamkor o'z moykasiga qo'shadi.
    """
    carwash = models.ForeignKey(Carwash,on_delete=models.CASCADE,related_name="services")
    title = models.CharField(max_length=150)  # masalan: "Standart yuvish"
    description = models.CharField(max_length=255, blank=True)
    price = models.PositiveIntegerField()  # so'mda
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.carwash_id} - {self.title}"


class CarwashRating(models.Model):
    """
    User bahosi (1..5). Har user har moykaga faqat 1 marta baho beradi.
    """
    carwash = models.ForeignKey(Carwash,on_delete=models.CASCADE,related_name="ratings")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="carwash_ratings")
    score = models.PositiveSmallIntegerField()  # 1..5
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["carwash", "user"], name="uniq_user_rating_per_carwash")]

    def __str__(self):
        return f"{self.carwash_id} - {self.user_id} ({self.score})"


class CarwashComment(models.Model):
    """
    User fikri/kommenti.
    """
    carwash = models.ForeignKey(Carwash,on_delete=models.CASCADE,related_name="comments")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="carwash_comments")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.carwash_id} - {self.user_id}"