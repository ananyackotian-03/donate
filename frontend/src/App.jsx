import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import AddDonation from "./pages/AddDonation";
import ViewDonations from "./pages/ViewDonations";
import MyDonations from "./pages/MyDonations";
import OrgDashboard from "./pages/OrgDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateOrganization from "./pages/CreateOrganization";
import MyOrganization from "./pages/MyOrganization";
import Notifications from "./pages/Notifications";

// Protected Route Component
function ProtectedRoute({ children, roles = [] }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          {!isAuthenticated && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {/* Protected Routes - Donor */}
          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute roles={['donor', 'organization', 'admin']}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-donation"
            element={
              <ProtectedRoute roles={['donor']}>
                <AddDonation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-donations"
            element={
              <ProtectedRoute roles={['donor']}>
                <MyDonations />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Public to view */}
          <Route
            path="/view-donations"
            element={
              <ProtectedRoute roles={['donor', 'organization', 'admin']}>
                <ViewDonations />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Organization */}
          <Route
            path="/create-organization"
            element={
              <ProtectedRoute roles={['donor', 'organization']}>
                <CreateOrganization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-organization"
            element={
              <ProtectedRoute roles={['organization', 'admin']}>
                <MyOrganization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization"
            element={
              <ProtectedRoute roles={['organization', 'admin']}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Notifications */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute roles={['donor', 'organization', 'admin']}>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;