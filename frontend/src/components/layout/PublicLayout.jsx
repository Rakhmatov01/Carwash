import { Outlet, useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import toast from "react-hot-toast";
import { rateCarwashApi } from "../../api/carwash";
import RatingPopup from "../carwash/RatingPopup";
import Navbar from "../Navbar";
import { meApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

export default function PublicLayout() {
  const navigate = useNavigate();
  const carwashId = useUiStore((s) => s.ratingPopup.carwashId);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const token = useAuthStore((s) => s.accessToken);
  useEffect(() => {
    if (!token) return;
    async function loadUser() {
      try {
        const res = await meApi();
        setUser(res.data);
      } catch (err) {
        toast.error(err.message);
        logout();
        navigate("/");
      }
    }
    loadUser();
  }, [setUser, logout]);

  async function onSubmitRating(rating) {
    try {
      const res = await rateCarwashApi(carwashId, rating);
      if (res.ok) toast.success("Rated successfully");
      useUiStore.getState().closeRatingPopup();
    } catch {
      toast.error("Rating failed");
    }
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <RatingPopup
        open={useUiStore((s) => s.ratingPopup.open)}
        onClose={() => useUiStore.getState().closeRatingPopup()}
        onSubmit={onSubmitRating}
      />
    </>
  );
}
