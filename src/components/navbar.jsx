import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="border-b bg-background sticky top-0 w-full z-10">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight"
          onClick={closeMenu}
        >
          Todo-ly
        </Link>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/todo">
                <Button variant="ghost">View Public Todos</Button>
              </Link>

              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                Hi, {user.name}
              </span>

              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>

              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile View*/}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          {!user ? (
            <>
              <Link to="/todo" onClick={closeMenu}>
                <Button variant="ghost" className="w-full mb-2">
                  View Public Todos
                </Button>
              </Link>

              <Link to="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full mb-2">
                  Login
                </Button>
              </Link>

              <Link to="/register" onClick={closeMenu}>
                <Button className="w-full mb-2">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="block text-sm text-muted-foreground pb-2">
                Hi, {user.name}
              </span>

              <Link to="/dashboard" onClick={closeMenu}>
                <Button variant="outline" className="w-full mb-2">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
