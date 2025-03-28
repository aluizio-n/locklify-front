import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, Lock, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/seo";

const checkoutSchema = z.object({
  cardNumber: z.string()
    .min(16, "O número do cartão deve ter pelo menos 16 dígitos")
    .max(19, "O número do cartão não deve exceder 19 dígitos")
    .regex(/^[0-9\s]+$/, "O número do cartão deve conter apenas números"),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Data de validade deve estar no formato MM/YY"),
  cvv: z.string()
    .length(3, "CVV deve ter 3 dígitos")
    .regex(/^[0-9]+$/, "CVV deve conter apenas números"),
  address: z.string().min(5, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  postalCode: z.string().min(5, "CEP é obrigatório"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface PlanDetailsProps {
  name: string;
  price: string;
  features: string[];
}

const planFeatures = {
  basic: [
    "Até 15 senhas",
    "Gerador de senhas",
    "Acesso em 1 dispositivo"
  ],
  premium: [
    "Senhas ilimitadas",
    "Sincronização em até 5 dispositivos",
    "Gerador de senhas avançado",
    "Verificador de violação de dados",
    "Compartilhamento seguro"
  ],
  lifetime: [
    "Tudo do plano Premium",
    "Dispositivos ilimitados",
    "Acesso vitalício a atualizações",
    "Autenticação de dois fatores avançada",
    "Relatórios de segurança",
    "Suporte prioritário"
  ]
};

const getPlanName = (plan: string): string => {
  switch (plan) {
    case "basic": return "Plano Básico";
    case "premium": return "Plano Premium";
    case "lifetime": return "Plano Vitalício";
    default: return "Plano Premium";
  }
};

const PlanDetails = ({ name, price, features }: PlanDetailsProps) => (
  <div className="border rounded-lg p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-bold text-lg">{name}</h3>
      <span className="text-2xl font-bold">{price}</span>
    </div>
    <p className="text-muted-foreground mb-3">por mês, cobrado mensalmente</p>
    <Separator className="my-3" />
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan") || "premium";
  const price = queryParams.get("price") || "45";
  
  const planName = getPlanName(plan);
  const selectedPlanFeatures = planFeatures[plan as keyof typeof planFeatures] || planFeatures.premium;
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.substr(0, 16);
    
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    form.setValue('cardNumber', formattedValue);
  };

  const handleExpiryDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    
    form.setValue('expiryDate', value);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Pagamento processado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO 
        title={`Checkout - ${planName} | Locklify`}
        description={`Complete sua compra do ${planName} do Locklify por R$ ${price},00 e proteja suas senhas com segurança.`}
        path="/checkout"
      />
      
      <div className="min-h-screen bg-background">
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <ThemeToggle />
            </div>
          </header>
          
          <div className="flex-1">
            <div className="container max-w-6xl px-4 md:px-6 py-6">
              <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Informações de Pagamento</CardTitle>
                      <CardDescription>
                        Preencha os dados do seu cartão para finalizar a assinatura
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium">Detalhes do Cartão</h3>
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Pagamento seguro</span>
                              </div>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Número do Cartão</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="1234 5678 9012 3456"
                                      {...field}
                                      onChange={handleCardNumberInput}
                                      maxLength={19}
                                      disabled={isProcessing}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cardName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome no Cartão</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Nome como aparece no cartão"
                                      {...field}
                                      disabled={isProcessing}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Validade</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="MM/YY"
                                        {...field}
                                        onChange={handleExpiryDateInput}
                                        maxLength={5}
                                        disabled={isProcessing}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="123"
                                        {...field}
                                        maxLength={3}
                                        disabled={isProcessing}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Endereço de Cobrança</h3>
                            
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Endereço</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Rua, número, complemento"
                                      {...field}
                                      disabled={isProcessing}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Sua cidade"
                                        {...field}
                                        disabled={isProcessing}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="00000-000"
                                        {...field}
                                        disabled={isProcessing}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                            disabled={isProcessing}
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            {isProcessing ? "Processando..." : "Finalizar Pagamento"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4 md:mt-9">
                  
                  <PlanDetails 
                    name={planName} 
                    price={`R$ ${price},00`} 
                    features={selectedPlanFeatures} 
                  />
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>R$ {price},00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Impostos</span>
                      <span>R$ 0,00</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {price},00</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Ao finalizar o pagamento, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="h-4 w-4" />
                <span>Pagamento seguro via Stripe</span>
              </div>
              <p>© 2024 Locklify - Todos os direitos reservados</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Checkout;
