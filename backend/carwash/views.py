from django.shortcuts import get_object_or_404

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import *
from .models import Carwash, CarwashService, CarwashRating, CarwashComment
from .serializers import *


# ---------- Permissions (ixcham) ----------
class IsPartner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, "role", None) == "partner"


# ---------- Carwash CRUD ----------
class WashList(ListAPIView):
    queryset = Carwash.objects.all().order_by("-id")
    serializer_class = CarwashSerializer
    permission_classes = [permissions.AllowAny]


class WashCreate(CreateAPIView):
    queryset = Carwash.objects.all()
    serializer_class = CarwashSerializer
    permission_classes = [IsPartner]  # faqat hamkor

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WashRetrieve(RetrieveAPIView):
    queryset = Carwash.objects.all()
    serializer_class = CarwashSerializer
    permission_classes = [permissions.AllowAny]


class WashUpdate(UpdateAPIView):
    queryset = Carwash.objects.all()
    serializer_class = CarwashSerializer
    permission_classes = [permissions.IsAuthenticated, IsPartner]

    def get_object(self):
        obj = super().get_object()
        if obj.owner_id != self.request.user.id:
            self.permission_denied(self.request, message="Faqat egasi o'zgartira oladi")
        return obj


class WashDestroy(DestroyAPIView):
    queryset = Carwash.objects.all()
    serializer_class = CarwashSerializer
    permission_classes = [permissions.IsAuthenticated, IsPartner]

    def get_object(self):
        obj = super().get_object()
        if obj.owner_id != self.request.user.id:
            self.permission_denied(self.request, message="Faqat egasi o'chira oladi")
        return obj


# ---------- Services (tariflar) ----------
class ServiceListCreate(ListCreateAPIView):
    serializer_class = CarwashServiceSerializer

    def get_queryset(self):
        return CarwashService.objects.filter(carwash_id=self.kwargs["pk"], is_active=True).order_by("id")

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [IsPartner()]

    def perform_create(self, serializer):
        carwash = get_object_or_404(Carwash, pk=self.kwargs["pk"])
        if carwash.owner_id != self.request.user.id:
            self.permission_denied(self.request, message="Faqat o'zingizning moykangizga tarif qo'shasiz")
        serializer.save(carwash=carwash)


# ---------- Comments ----------
class CommentListCreate(ListCreateAPIView):
    serializer_class = CarwashCommentSerializer

    def get_queryset(self):
        return CarwashComment.objects.filter(carwash_id=self.kwargs["pk"]).order_by("-created_at")

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(carwash_id=self.kwargs["pk"], user=self.request.user)


# ---------- Rating (1..5) ----------
class SetRating(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        carwash = get_object_or_404(Carwash, pk=pk)

        ser = CarwashRatingSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        rating, created = CarwashRating.objects.update_or_create(
            carwash=carwash,
            user=request.user,
            defaults={"score": ser.validated_data["score"]},
        )

        return Response(
            CarwashRatingSerializer(rating).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )


# ---------- Quote (summa hisoblash) ----------
class Quote(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        service_ids = request.data.get("service_ids", [])
        if not isinstance(service_ids, list):
            return Response({"detail": "service_ids list bo‘lishi kerak"}, status=400)

        services = CarwashService.objects.filter(
            carwash_id=pk,
            id__in=service_ids,
            is_active=True
        )

        items = [{"id": s.id, "title": s.title, "price": s.price} for s in services]
        total = sum(i["price"] for i in items)

        return Response({"carwash_id": pk, "items": items, "total": total})