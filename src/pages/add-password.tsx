
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswords } from "@/contexts/passwords-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordStrength } from "@/components/password-strength";

export default function AddPassword() {
  const navigate = useNavigate();
  const { addPassword, isLoading } = usePasswords();
  const [formData, setFormData] = useState({
    serviceName: "",
    email: "",
    password: "",
    url: "",
    notes: ""
  });
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratedPassword = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
    setShowPasswordGenerator(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceName || !formData.email || !formData.password) {
      toast.error("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    const success = await addPassword({
      serviceName: formData.serviceName,
      email: formData.email,
      password: formData.password,
      url: formData.url,
      notes: formData.notes
    });
    
    if (success) {
      toast.success("Senha adicionada com sucesso");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao dashboard
        </Button>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Nova senha</CardTitle>
            <CardDescription>
              Adicione uma nova senha ao seu gerenciador
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Nome do serviço *</Label>
                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="Ex: Google, Facebook, Twitter"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Usuário/Email *</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Seu nome de usuário ou email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha *</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
                  >
                    {showPasswordGenerator ? "Fechar gerador" : "Gerar senha"}
                  </Button>
                </div>
                
                <Input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="Digite ou gere uma senha forte"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                
                {formData.password && <PasswordStrength password={formData.password} />}
                
                {showPasswordGenerator && (
                  <div className="mt-2 p-3 border rounded-md">
                    <PasswordGenerator onGeneratePassword={handleGeneratedPassword} />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL (opcional)</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://exemplo.com"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Adicione informações adicionais"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar senha"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
