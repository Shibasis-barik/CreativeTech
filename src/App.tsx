
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import YouTubeLoadingBar from "./components/YouTubeLoadingBar";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const Dashboard = lazy(() => import("./pages/Dashboard"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminRoles = lazy(() => import("./pages/AdminRoles"));
const AdminPermissions = lazy(() => import("./pages/AdminPermissions"));
const AdminServices = lazy(() => import("./pages/AdminServices"));
const AdminMessages = lazy(() => import("./pages/AdminMessages"));

// Page loading fallback
function PageLoading() {
  return (
    <div className="min-h-[calc(100svh-73px)] bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="mx-auto h-8 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />

        <div className="mx-auto h-12 max-w-xl rounded-lg bg-slate-200 dark:bg-slate-800" />

        <div className="mx-auto h-4 max-w-2xl rounded bg-slate-200 dark:bg-slate-800" />

        <div className="grid gap-6 pt-8 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    ["/login", "/signup", "/forgot-password", "/dashboard"].includes(
      location.pathname
    ) ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/reset-password/");

  return (
    <>
      <YouTubeLoadingBar />

      {!hideNavbar && <Navbar />}

      <ScrollToTop />

      <Suspense fallback={<PageLoading />}>
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

          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Suspense>
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
