import { BrowserRouter , Routes, Route , Navigate } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import CarwashDetailPage from "../pages/public/CarwashDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PartnerDashboardPage from "../pages/partner/PartnerDashboardPage";

export default function AppRouter(){
    return (
        <BrowserRouter future={{
    v7_startTransition: true,
  }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/carwash/:id" element={<CarwashDetailPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/partner" element={
                <ProtectedRoute>
                    <RoleRoute role="partner">
                        <PartnerDashboardPage/>
                    </RoleRoute>
                </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/"replace/>} />


          </Routes>
        </BrowserRouter>
    )
}
