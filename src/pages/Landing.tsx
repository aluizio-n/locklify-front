import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Shield, Check, AlertCircle, Key, Lock, Unlock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmailBreachChecker } from "@/components/email-breach-checker";
import SEO from "@/components/seo";
import { useAuth } from "@/contexts/auth-context";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [plan, setPlan] = useState("free");
  const [duration, setDuration] = useState("monthly");

  const price =
    plan === "free" ? 0 : plan === "premium" ? (duration === "monthly" ? 9.99 : 99.99) : duration === "monthly" ? 4.99 : 49.99;

  const features = {
    free: ["10 Passwords", "Basic Security", "Limited Support"],
    standard: ["Unlimited Passwords", "Advanced Security", "Priority Support"],
    premium: ["Unlimited Passwords", "Military Grade Security", "24/7 Support"],
  };

  const handlePlanChange = (value: string) => {
    setPlan(value);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
  };

  return (
    <>
      <SEO 
        title="Locklify - Gerenciador de Senhas Seguro e Fácil de Usar" 
        description="Proteja suas contas online com o Locklify, um gerenciador de senhas que impede o reuso de senhas entre serviços. Criptografia de ponta a ponta para sua segurança."
        keywords="gerenciador de senhas, segurança online, proteção de contas, criptografia, senhas únicas, vazamento de dados"
      />
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex items-center space-x-2">
              <Key className="h-6 w-6" />
              <span className="font-bold">Locklify</span>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
              <nav className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Criar conta</Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b">
            <div className="container space-y-10 xl:space-y-16">
              <div className="grid gap-4 px-4 md:px-6 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Simplifique e proteja suas senhas
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Gerencie todas as suas senhas em um só lugar com segurança total e criptografia de ponta a ponta.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link to="/register">
                      <Button className="flex-1">Começar agora</Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="flex-1">Fazer login</Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <Shield className="h-[280px] w-[280px] text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-red-700 text-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    O perigo de usar a mesma senha
                  </h2>
                  <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Quando você usa a mesma senha em vários sites, está colocando todas as suas contas em risco.
                  </p>
                </div>
                <div className="w-full max-w-3xl grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
                  <Card className="bg-red-800 border-red-600">
                    <CardHeader>
                      <CardTitle className="text-white">Efeito Dominó</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                      Um único vazamento compromete todas as suas contas que compartilham a mesma senha.
                    </CardContent>
                  </Card>
                  <Card className="bg-red-800 border-red-600">
                    <CardHeader>
                      <CardTitle className="text-white">Roubo de Identidade</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                      Criminosos podem acessar suas contas bancárias, e-mails e redes sociais com uma única senha vazada.
                    </CardContent>
                  </Card>
                  <Card className="bg-red-800 border-red-600">
                    <CardHeader>
                      <CardTitle className="text-white">Dados Expostos</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                      Informações pessoais e financeiras ficam vulneráveis quando senhas são compartilhadas entre serviços.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Verifique seu e-mail
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Descubra se suas informações foram comprometidas em vazamentos de dados conhecidos
                  </p>
                </div>
                <div className="w-full max-w-lg">
                  <EmailBreachChecker />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Como o Locklify protege você
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Nosso gerenciador de senhas foi projetado pensando na sua segurança
                  </p>
                </div>
                <div className="w-full max-w-3xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Senhas exclusivas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Crie senhas diferentes e fortes para cada serviço automaticamente
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Criptografia forte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dados protegidos com criptografia AES-256 de ponta a ponta
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Acesso em qualquer lugar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Disponível em todos os seus dispositivos, sempre que precisar
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Alertas de segurança</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receba notificações sobre vazamentos de dados e senhas fracas
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Preenchimento automático</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Login automático em sites e aplicativos sem complicação
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Backup seguro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nunca perca suas senhas com nosso sistema de backup criptografado
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 dark:bg-slate-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Escolha o plano ideal para você
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Experimente grátis ou escolha um plano que impulsione sua segurança
                  </p>
                </div>
                <Tabs defaultValue="monthly" className="w-full max-w-sm">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly" onClick={() => handleDurationChange("monthly")}>
                      Mensal
                    </TabsTrigger>
                    <TabsTrigger value="yearly" onClick={() => handleDurationChange("yearly")}>
                      Anual
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly" />
                  <TabsContent value="yearly" />
                </Tabs>
                <div className="grid w-full max-w-md grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className="border-2 border-muted-foreground">
                    <CardHeader>
                      <CardTitle>Grátis</CardTitle>
                      <CardDescription>Ideal para iniciantes</CardDescription>
                    </CardHeader>
                    <CardContent className="grid space-y-2">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">R$0/mês</div>
                      </div>
                      <ul className="grid gap-1.5 text-sm text-muted-foreground">
                        {features.free.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check className="mr-2 h-4 w-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Começar</Button>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle>Standard</CardTitle>
                      <CardDescription>Para uso pessoal</CardDescription>
                    </CardHeader>
                    <CardContent className="grid space-y-2">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">R${duration === "monthly" ? "4,99" : "49,99"}/mês</div>
                      </div>
                      <ul className="grid gap-1.5 text-sm text-muted-foreground">
                        {features.standard.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check className="mr-2 h-4 w-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/checkout">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          Assinar
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-muted-foreground">
                    <CardHeader>
                      <CardTitle>Premium</CardTitle>
                      <CardDescription>Segurança máxima</CardDescription>
                    </CardHeader>
                    <CardContent className="grid space-y-2">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">R${duration === "monthly" ? "9,99" : "99,99"}/mês</div>
                      </div>
                      <ul className="grid gap-1.5 text-sm text-muted-foreground">
                        {features.premium.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check className="mr-2 h-4 w-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/checkout">
                        <Button className="w-full">Assinar</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Perguntas frequentes
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Tire suas dúvidas sobre o Locklify
                  </p>
                </div>
                <div className="w-full max-w-3xl">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>O que é o Locklify?</AccordionTrigger>
                      <AccordionContent>
                        Locklify é um gerenciador de senhas que te ajuda a proteger suas contas online.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Como funciona a criptografia?</AccordionTrigger>
                      <AccordionContent>
                        Utilizamos criptografia AES-256 para proteger suas senhas.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Posso usar o Locklify em vários dispositivos?</AccordionTrigger>
                      <AccordionContent>
                        Sim, o Locklify está disponível em todos os seus dispositivos.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>

          <footer className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-gray-500 md:text-xl dark:text-gray-400">
                    Locklify - Gerenciador de Senhas Seguro
                  </p>
                  <p className="text-gray-500 md:text-xl dark:text-gray-400">
                    © 2024 Todos os direitos reservados
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
