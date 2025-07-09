import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AssistantDashboard from "./pages/AssistantDashboard";


export default function AppRoutes({ changes, onChange }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

       
        <Route
          path="/dashboard"
          element={<UserDashboard onChange={onChange} />}
        />

        
        <Route
          path="/asistan"
          element={<AssistantDashboard changes={changes} />}
        />

        
      </Routes>
    </BrowserRouter>
  );
}
