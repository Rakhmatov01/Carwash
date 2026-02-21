from django.urls import path
from .views import (
    WashList, WashCreate, WashRetrieve, WashUpdate, WashDestroy,
    ServiceListCreate, CommentListCreate, SetRating, Quote
)

urlpatterns = [
    # Carwash CRUD
    path("carwash/", WashList.as_view(), name="carwash-list"),
    path("carwash/create/", WashCreate.as_view(), name="carwash-create"),
    path("carwash/<int:pk>/", WashRetrieve.as_view(), name="carwash-detail"),
    path("carwash/<int:pk>/update/", WashUpdate.as_view(), name="carwash-update"),
    path("carwash/<int:pk>/delete/", WashDestroy.as_view(), name="carwash-delete"),
    path("carwash/<int:pk>/services/", ServiceListCreate.as_view(), name="carwash-services"),
    path("carwash/<int:pk>/comments/", CommentListCreate.as_view(), name="carwash-comments"),
    path("carwash/<int:pk>/rate/", SetRating.as_view(), name="carwash-rate"),
    path("carwash/<int:pk>/quote/", Quote.as_view(), name="carwash-quote"),
]