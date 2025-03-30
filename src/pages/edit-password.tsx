
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { usePasswords } from "@/contexts/passwords-context";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordStrength } from "@/components/password-strength";

const passwordSchema = z.object({
  serviceName: z.string().min(1, "Nome do serviço é obrigatório"),
  email: z.string().min(1, "Nome de usuário ou email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  url: z.string().optional(),
  notes: z.string().optional(),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function EditPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { getPassword, updatePassword, isLoading } = usePasswords();
  const navigate = useNavigate();

  const passwordEntry = id ? getPassword(id) : undefined;

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      serviceName: "",
      email: "",
      password: "",
      url: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (passwordEntry) {
      form.reset({
        serviceName: passwordEntry.serviceName,
        email: passwordEntry.email,
        password: passwordEntry.password,
        url: passwordEntry.url || "",
        notes: passwordEntry.notes || "",
      });
    } else if (id) {
      toast.error("Senha não encontrada");
      navigate("/dashboard");
    }
  }, [passwordEntry, id, form, navigate]);

  const onSubmit = async (data: PasswordFormValues) => {
    if (!id) return;
    
    const success = await updatePassword(id, data);
    if (success) {
      toast.success("Senha atualizada com sucesso");
      navigate("/dashboard");
    } else {
      toast.error("Falha ao atualizar senha");
    }
  };

  const handleGeneratedPassword = (password: string) => {
    form.setValue("password", password);
  };

  if (!passwordEntry && id) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para senhas
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Editar senha</CardTitle>
            <CardDescription>
              Atualize os detalhes da senha selecionada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do serviço</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Google, Facebook, Instagram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de usuário ou Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: seuemail@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <div className="space-y-3">
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Digite ou gere uma senha"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setShowGenerator(!showGenerator)}
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="sr-only">Gerar senha</span>
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Esconder senha" : "Mostrar senha"}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <PasswordStrength password={field.value} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showGenerator && (
                  <div className="py-2">
                    <PasswordGenerator onGeneratePassword={handleGeneratedPassword} />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do site (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: https://www.google.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Insira a URL completa, incluindo https://
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Adicione notas adicionais sobre esta senha"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Atualizando..." : "Atualizar senha"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center border-t px-6 py-4">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              Todas as suas senhas são armazenadas de forma segura localmente no seu dispositivo.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
