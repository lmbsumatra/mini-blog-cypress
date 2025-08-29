import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
const LandingPage = lazy(() => import("../pages/Landing"));
const LoginPage = lazy(() => import("../pages/Login"));
const SignupPage = lazy(() => import("../pages/Signup"));
const PreviewPage = lazy(() => import("../pages/Preview"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPassword"));

const MainLayout = lazy(() => import("../layouts/Main"));
const GeneralLayout = lazy(() => import("../layouts/General"));

const HomePage = lazy(() => import("../pages/Home"));
const PageNotFoundPage = lazy(() => import("../pages/PageNotFound"));

export const routes = [
  // Protected routes (logged-in only)
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "*", element: <PageNotFoundPage /> },
        ],
      },
    ],
  },

  // Guest-only routes
  {
    path: "/",
    element: <GeneralLayout />,
    children: [
      { path: "/", element: <LandingPage /> },

      {
        path: "/login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        ),
      },

      { path: "/preview", element: <PreviewPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },

      // catch all
      { path: "*", element: <PageNotFoundPage /> },
    ],
  },

  // fallback for unmatched routes
  { path: "*", element: <PageNotFoundPage /> },
];
