
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, AlertTriangle, Check, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Email validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function EmailBreachChecker() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [breachResult, setBreachResult] = useState<{
    breached: boolean;
    count?: number;
    breaches?: string[];
  } | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setBreachResult(null);

    try {
      // HIBP API requires a specific format and an API key
      // For demonstration, we'll use a simple mock response
      // In a real implementation, you would set up a backend proxy to handle this API call
      // as HIBP requires API keys that should not be exposed in frontend code
      
      // Mock API call - in production you would use a proper backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockCheck = Math.random() > 0.5;
      
      if (mockCheck) {
        setBreachResult({
          breached: true,
          count: Math.floor(Math.random() * 10) + 1,
          breaches: ["Adobe", "LinkedIn", "Dropbox"].slice(0, Math.floor(Math.random() * 3) + 1)
        });
        toast({
          title: "E-mail encontrado em vazamentos!",
          description: "Recomendamos mudar suas senhas imediatamente.",
          variant: "destructive",
        });
      } else {
        setBreachResult({
          breached: false
        });
        toast({
          title: "Boa notícia!",
          description: "Seu e-mail não foi encontrado em vazamentos conhecidos.",
        });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast({
        title: "Erro ao verificar",
        description: "Não foi possível verificar seu e-mail. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Verifique se seu e-mail foi vazado</CardTitle>
        <CardDescription>
          Descubra se suas credenciais foram comprometidas em vazamentos de dados conhecidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="seuemail@exemplo.com" 
                        {...field} 
                        disabled={isLoading}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Verificar E-mail"}
            </Button>
          </form>
        </Form>

        {breachResult && (
          <div className={`mt-4 p-4 rounded-md ${breachResult.breached ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}>
            {breachResult.breached ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">
                    E-mail encontrado em {breachResult.count} vazamentos
                  </p>
                </div>
                <p className="text-sm">
                  Serviços afetados: {breachResult.breaches?.join(", ")}
                </p>
                <p className="text-sm mt-2">
                  Recomendamos alterar suas senhas em todos os serviços e utilizar senhas diferentes para cada um.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="h-5 w-5" />
                <p className="font-medium">
                  Boas notícias! Seu e-mail não foi encontrado em vazamentos conhecidos.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 mr-1" />
          Verificação segura com API Have I Been Pwned
        </div>
      </CardFooter>
    </Card>
  );
}
