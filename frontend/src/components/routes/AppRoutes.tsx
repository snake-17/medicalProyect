import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Reservation from "../pages/Reservation";
import EditSection from "../sections/reservations/EditSection";
import AvailabilitySection from "../sections/reservations/AvailabilitySection";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/appointments" element={<Reservation />} />
        <Route path="/editappointment" element={<EditSection />} />
        <Route path="/availability" element={<AvailabilitySection />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
