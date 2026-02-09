import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Oops! Something went wrong</h2>
      <p>'{error.message}'</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
