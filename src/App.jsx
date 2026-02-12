import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "./components/ui/button";

const TodoPage = lazy(() => import("./components/todo/todo-page"));
const NotFound = lazy(() => import("./pages/not-found"));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">'{error.message}'</p>
        <Button className="variant cursor-pointer" onClick={resetErrorBoundary}>
          Retry
        </Button>
      </div>
    </div>
  );
}

function TestError() {
  throw new Error("This is a test error");
}

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/error-test" element={<TestError />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
