import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRoles from "./pages/AdminRoles";
import AdminPermissions from "./pages/AdminPermissions";
import AdminServices from "./pages/AdminServices";
import AdminMessages from "./pages/AdminMessages";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/forgot-password", "/dashboard"].includes(location.pathname) || location.pathname.startsWith("/admin") || location.pathname.startsWith("/reset-password/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* Scroll to top on every route change */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/roles" element={<AdminRoles />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
