import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, LogOut, User, Key, Shield } from "lucide-react";
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
import { EmailBreachChecker } from "@/components/email-breach-checker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { passwords, isLoading, loadPasswords } = usePasswords();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState<PasswordEntry[]>([]);
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  useEffect(() => {
    loadPasswords(); // ✅ Chamando a API sempre que o dashboard renderizar
  }, []);

  // Effect hook to update filtered passwords on password list change or search term change
  useEffect(() => {
    const filtered = passwords.filter((password) =>
      password.serviceName && password.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPasswords(filtered);
  }, [passwords, searchTerm]);  // Trigger when passwords or searchTerm changes

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800">
      <header className="bg-white dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-6 w-6" />
            <h1 className="text-xl font-bold">Locklify</h1>
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
        <Tabs defaultValue="passwords" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="passwords" className="px-4">Minhas senhas</TabsTrigger>
            <TabsTrigger value="security" className="px-4">Segurança</TabsTrigger>
          </TabsList>
          
          <TabsContent value="passwords">
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
          </TabsContent>
          
          <TabsContent value="security">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Verificação de segurança</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Descubra se seus dados foram comprometidos em vazamentos conhecidos e melhore sua segurança online.
              </p>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmailBreachChecker />
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Dicas de segurança</h3>
                    </div>
                    
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Use senhas únicas para cada serviço.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Ative a autenticação de dois fatores sempre que possível.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Troque suas senhas regularmente, especialmente para contas importantes.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Verifique regularmente se seus dados foram expostos em vazamentos.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Nunca compartilhe suas senhas com terceiros.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
