// App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";


const queryClient = new QueryClient();

/** Simple auth check using your localStorage token */
const isAuthenticated = () => !!localStorage.getItem("auth_token");

/** Route guard: requires auth, otherwise redirect to /auth */
function RequireAuth() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

/** Public-only guard: if already logged in, go home */
function PublicOnly({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public auth page; redirect to "/" if already logged in */}
      <Route
        path="/auth"
        element={
          <PublicOnly>
            <Auth />
          </PublicOnly>
        }
      />

      {/* Protected block */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Index />} />
        <Route path="/chat/:botId" element={<ChatPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* NOTE: No <BrowserRouter> here */}
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
