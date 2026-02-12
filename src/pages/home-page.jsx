import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[75vh] flex flex-col">
      <div className="flex flex-1 items-center justify-center px-6">
        <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Organize Your Life.
            </h1>

            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
              Manage your tasks efficiently, track progress, and stay productive
              with our simple todo system.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              {!user ? (
                <>
                  <Link to="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              )}

              <Link to="/todo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  View Public Todos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
