
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, LogOut, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { usePasswords } from "@/contexts/passwords-context";
import { PasswordEntry } from "@/contexts/passwords-context";
import PasswordCard from "@/components/password-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { passwords, isLoading } = usePasswords();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800">
      <header className="bg-white dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-6 w-6" />
            <h1 className="text-xl font-bold">Secure Vault</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-slate-700 text-white dark:bg-slate-600">
                      {user ? getInitials(user.name) : ""}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold">Minhas senhas</h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar senhas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => navigate("/add-password")} className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova senha
                </Button>
              </TooltipTrigger>
              <TooltipContent>Adicionar nova senha</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-32 animate-pulse">
                <CardContent className="p-4">
                  <div className="bg-slate-300 dark:bg-slate-600 h-6 w-2/3 rounded mb-4"></div>
                  <div className="bg-slate-300 dark:bg-slate-600 h-4 w-1/2 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPasswords.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <div>
                <p className="text-xl font-semibold">Nenhuma senha encontrada</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Nenhuma senha corresponde à sua busca
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-semibold">Nenhuma senha cadastrada</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2 mb-4">
                  Adicione sua primeira senha para começar
                </p>
                <Button onClick={() => navigate("/add-password")} className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar senha
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPasswords.map((password: PasswordEntry) => (
              <PasswordCard key={password.id} password={password} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
