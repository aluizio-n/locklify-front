
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Shield } from "lucide-react";

export const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Locklify</span>
          </div>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#features" className={navigationMenuTriggerStyle()}>
                  Recursos
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#pricing" className={navigationMenuTriggerStyle()}>
                  Preços
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#faq" className={navigationMenuTriggerStyle()}>
                  FAQ
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/register")}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
