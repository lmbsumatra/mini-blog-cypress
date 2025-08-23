import { lazy } from "react";

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
  {
    path: "/home",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // catch
      { path: "*", element: <PageNotFoundPage /> },
    ],
  },
  {
    path: "/",
    element: <GeneralLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/preview", element: <PreviewPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },

      // catch
      { path: "*", element: <PageNotFoundPage /> },
    ],
  },
  { path: "*", element: <PageNotFoundPage /> },
];
