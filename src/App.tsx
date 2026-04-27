import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "./components/ui/button";
import Navbar from "./components/navbar";
import { Spinner } from "@/components/ui/spinner";
import ProtectedRoute from "./components/protected-route";
import type { FallbackProps } from "react-error-boundary";

const TodoPage = lazy(() => import("./pages/todo-page"));
const NotFound = lazy(() => import("./pages/not-found"));
const LoginPage = lazy(() => import("./pages/login-page"));
const HomePage = lazy(() => import("./pages/home-page"));
const SignupPage = lazy(() => import("./pages/signup-page"));
const DashboardPage = lazy(() => import("./pages/dashboard-page"));

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
        <Button className="variant cursor-pointer" onClick={resetErrorBoundary}>
          Retry
        </Button>
      </div>
    </div>
  );
}

function TestError(): React.ReactNode {
  throw new Error("This is a test error");
}

function App() {
  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex justify-center items-center">
              <Spinner className="size-6" />
            </div>
          }
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage></DashboardPage>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/error-test" element={<TestError />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
