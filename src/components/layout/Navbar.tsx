import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to={isAuthenticated ? "/post" : "/"}
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              ngampus.in
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center">
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative flex items-center gap-2 h-9 rounded-full"
                      >
                        <Avatar className="h-8 w-8 border-2 border-primary/10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline-block font-medium text-sm">
                          {user.name.split(" ")[0]}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-1">
                      <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={handleProfileClick}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/auth/login">
                      <Button variant="default" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth/register">
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="pt-4 pb-3">
            {isAuthenticated && user ? (
              <div className="px-4">
                <div className="flex items-center p-4 mb-2 bg-muted/50 rounded-lg">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-base font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <Badge variant="outline" className="font-normal">
                        {user.fakultas}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                    onClick={handleProfileClick}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                  <Button
                    onClick={logout}
                    variant="destructive"
                    className="w-full mt-4 justify-start"
                    size="sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <Link to="/auth/login">
                  <Button className="w-full">Login</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
