
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Lock, Key, ExternalLink } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 flex justify-between">
        <Button 
          variant="link" 
          className="flex items-center gap-1 text-primary" 
          onClick={() => navigate("/landing")}
        >
          <ExternalLink className="h-4 w-4" />
          Ver Landing Page Completa
        </Button>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <Shield className="h-20 w-20 mx-auto mb-4 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Locklify</h1>
        <p className="text-xl mb-8 max-w-md text-muted-foreground">
          Gerenciador de senhas seguro e fácil de usar para proteger todas as suas informações de acesso.
        </p>
        
        <div className="space-y-4 w-full max-w-xs">
          <Button 
            className="w-full py-6 text-lg" 
            onClick={() => navigate("/login")}
          >
            <Lock className="mr-2 h-5 w-5" />
            Entrar
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg"
            onClick={() => navigate("/register")}
          >
            <Key className="mr-2 h-5 w-5" />
            Criar conta
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Armazenamento Seguro</h3>
            <p className="text-muted-foreground">Suas senhas são armazenadas com segurança e criptografadas.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Gerador de Senhas</h3>
            <p className="text-muted-foreground">Crie senhas fortes e únicas com nosso gerador integrado.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Acesso Fácil</h3>
            <p className="text-muted-foreground">Acesse suas senhas de forma rápida e conveniente.</p>
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © 2024 Locklify - Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Index;
