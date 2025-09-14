// src/components/layout/Navbar.tsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import LogoMark from "@/components/graphics/LogoMark";
import Wordmark from "@/components/graphics/Wordmark";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This interface accounts for fields from both Google and GitHub
interface User {
  name?: string;       // From Google (and sometimes GitHub)
  login?: string;      // From GitHub
  picture?: string;    // From Google
  avatar_url?: string; // From GitHub
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const onNew = () => navigate("/landing");

  const user: User | null = useMemo(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("lastLogin");
    navigate("/");
  };

  // ✅ **This is the key part for handling both providers**
  // It checks for Google's 'name', then falls back to GitHub's 'login'
  const userName = user?.name || user?.login || "Account";
  // It checks for Google's 'picture', then falls back to GitHub's 'avatar_url'
  const userImage = user?.picture || user?.avatar_url;
  
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/landing" className="flex items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink
            to="/landing"
            current={location.pathname.startsWith("/landing")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/analysis"
            current={location.pathname.startsWith("/analysis")}
          >
            Analysis
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
            Optiv Security
          </span>
          <Button variant="outline" onClick={onNew}>
            New Analysis
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  to,
  children,
  current,
}: {
  to: string;
  children: React.ReactNode;
  current?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground",
        current && "bg-muted text-foreground"
      )}
    >
      {children}
    </Link>
  );
}