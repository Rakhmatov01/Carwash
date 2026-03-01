// routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import CarwashDetailPage from "../pages/public/CarwashDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PartnerDashboardPage from "../pages/partner/PartnerDashboardPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import PartnerCarwashEditPage from "../pages/partner/PartnerCarwashEditPage";
import PrivateLayout from "../components/layout/PrivateLayout";
import PublicLayout from "../components/layout/PublicLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/carwash/:id" element={<CarwashDetailPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
      <Route path="/profile" element={<UserProfilePage />} />
      <Route
        path="/partner"
        element={
          <ProtectedRoute>
            <RoleRoute role="partner">
              <PartnerDashboardPage />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/carwashEdit"
        element={
          <ProtectedRoute>
            <RoleRoute role="partner">
              <PartnerCarwashEditPage />
            </RoleRoute>
          </ProtectedRoute>
        }
      /></Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      

      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}