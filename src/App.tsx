import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import StarshipsPage from "./pages/StarshipsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/starships" replace />} />
            <Route path="/starships" element={<StarshipsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
