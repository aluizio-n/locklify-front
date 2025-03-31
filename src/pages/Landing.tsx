import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Play, Check, ChevronDown, ChevronUp, Lock, Key, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingButton } from "@/components/pricing-button";
import SEO from "@/components/seo";
import LandingHeader from "@/components/landing-header";

const Landing = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setActiveAccordion(activeAccordion === value ? null : value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title="Locklify - Use senhas únicas para cada conta e fique seguro" 
        description="Gerenciador de senhas seguro que ajuda você a criar e gerenciar senhas únicas para cada serviço, evitando os riscos de usar a mesma senha em vários lugares."
        path="/"
      />

      <LandingHeader />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium border rounded-full bg-red-800 text-white border-red-800">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span>Alerta de Segurança</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Uma senha única para cada conta
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                <span className="font-semibold text-red-600">81% das violações de dados acontecem por reutilização de senhas.</span> O Locklify cria e gerencia senhas únicas e fortes para cada serviço, protegendo você contra ataques em cascata.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" onClick={() => navigate("/register")}>
                  Comece Agora - É Grátis
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Já tenho uma conta
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-primary" />
                  <p className="ml-1">Senhas únicas para cada site</p>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-primary" />
                  <p className="ml-1">Gerador de senhas fortes</p>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-primary" />
                  <p className="ml-1">Criptografia de ponta a ponta</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                <div className="relative bg-card rounded-xl shadow-lg p-6 border">
                  <div className="flex justify-center items-center mb-8">
                    <Shield className="h-20 w-20 text-primary" />
                  </div>
                  <div className="space-y-6">
                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-10 bg-primary/30 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Password Security Risk Section */}
      <section className="w-full py-12 md:py-24 bg-red-700 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              O perigo de usar a mesma senha
            </h2>
            <p className="max-w-[800px] mx-auto md:text-xl">
              Quando você usa a mesma senha em vários lugares, se um site for comprometido, <span className="font-semibold">todas as suas contas estão em risco</span>.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-red-800 text-white border-red-600">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Uma senha = Múltiplos riscos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Usar a mesma senha em vários sites significa que se um site for hackeado, todas as suas contas ficam vulneráveis ao mesmo tempo.</p>
              </CardContent>
            </Card>

            <Card className="bg-red-800 text-white border-red-600">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Ataques de "credential stuffing"</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hackers usam credenciais vazadas para tentar acessar várias de suas contas automaticamente, e geralmente conseguem.</p>
              </CardContent>
            </Card>

            <Card className="bg-red-800 text-white border-red-600">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Memória limitada</CardTitle>
              </CardHeader>
              <CardContent>
                <p>É humanamente impossível memorizar dezenas de senhas fortes e diferentes, por isso a maioria das pessoas acaba reutilizando senhas.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Como o Locklify resolve esse problema:</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
              <div className="bg-red-800 p-6 rounded-lg shadow-md border border-red-600">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Senha única para cada site</h4>
                <p className="text-sm">Gera automaticamente senhas fortes e diferentes para cada site que você usa.</p>
              </div>

              <div className="bg-red-800 p-6 rounded-lg shadow-md border border-red-600">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Uma senha mestra</h4>
                <p className="text-sm">Você só precisa lembrar de uma senha - o Locklify cuida do resto.</p>
              </div>

              <div className="bg-red-800 p-6 rounded-lg shadow-md border border-red-600">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Criptografia avançada</h4>
                <p className="text-sm">Suas senhas são criptografadas com os mais altos padrões de segurança.</p>
              </div>

              <div className="bg-red-800 p-6 rounded-lg shadow-md border border-red-600">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Alertas de violação</h4>
                <p className="text-sm">Receba alertas quando seus dados aparecerem em vazamentos conhecidos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground">
                Como funciona
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Veja o Locklify em ação
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                Uma demonstração rápida de como o Locklify protege suas informações.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border shadow-xl w-full max-w-4xl aspect-video relative bg-card mt-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" variant="outline" className="rounded-full w-16 h-16 p-0 flex items-center justify-center bg-black/20 backdrop-blur-sm border-white/30 hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="w-full h-full bg-card animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Planos simples e transparentes
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                Escolha o plano que melhor atende às suas necessidades.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mt-8">
              {/* Free Plan */}
              <Card className="flex flex-col justify-between border-2 h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Gratuito</CardTitle>
                    <div className="inline-block px-3 py-1 text-xs rounded-full bg-muted">Básico</div>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">R$0</span>
                    <span className="ml-1 text-sm text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <ul className="space-y-1 mt-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Até 15 senhas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Gerador de senhas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Acesso em 1 dispositivo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2">
                  <PricingButton className="w-full" variant="outline" plan="basic">
                    Começar Agora
                  </PricingButton>
                </CardFooter>
              </Card>

              {/* Lifetime Plan */}
              <Card className="flex flex-col justify-between border-2 border-primary relative h-full">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium rounded-md">
                  Popular
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Vitalício</CardTitle>
                    <div className="inline-block px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground">Recomendado</div>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">R$200</span>
                    <span className="ml-1 text-sm text-muted-foreground">pagamento único</span>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <ul className="space-y-1 mt-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Senhas ilimitadas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Dispositivos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Gerador de senhas avançado</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Verificador de violação de dados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Compartilhamento seguro</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Acesso vitalício a atualizações</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Relatórios de segurança</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Suporte prioritário</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2">
                  <PricingButton className="w-full" plan="lifetime" price="200">
                    Comprar Agora
                  </PricingButton>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Perguntas Frequentes
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                Respostas para as dúvidas mais comuns sobre o Locklify.
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Minhas senhas estão realmente seguras?</AccordionTrigger>
                  <AccordionContent>
                    Sim! Utilizamos criptografia de ponta a ponta, o que significa que suas senhas são criptografadas antes mesmo de saírem do seu dispositivo. Nem mesmo nossa equipe tem acesso às suas informações.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Por que preciso de senhas diferentes para cada site?</AccordionTrigger>
                  <AccordionContent>
                    Quando você utiliza a mesma senha em vários lugares, basta que um único site seja comprometido para que todas as suas contas fiquem vulneráveis. Hackers frequentemente testam senhas vazadas em outros serviços. Com o Locklify, você tem senhas únicas para cada serviço, limitando o impacto de possíveis vazamentos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como conseguirei lembrar de tantas senhas diferentes?</AccordionTrigger>
                  <AccordionContent>
                    Você não precisa! Essa é a beleza do Locklify. Você só precisa lembrar de uma única senha mestra para acessar o Locklify. Nossa aplicação cuida de todas as outras senhas para você, gerando, armazenando e preenchendo automaticamente quando necessário.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Posso acessar minhas senhas offline?</AccordionTrigger>
                  <AccordionContent>
                    Sim, uma vez que você tenha feito login, suas senhas são armazenadas localmente de forma segura. Você pode acessá-las mesmo sem conexão com a internet.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Como funciona a sincronização entre dispositivos?</AccordionTrigger>
                  <AccordionContent>
                    Quando você adiciona ou atualiza uma senha em um dispositivo, nossa tecnologia sincroniza automaticamente essas alterações em todos os seus dispositivos logados, mantendo tudo atualizado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>O que acontece se eu esquecer minha senha mestra?</AccordionTrigger>
                  <AccordionContent>
                    Por motivos de segurança, não armazenamos sua senha mestra em lugar nenhum. Recomendamos que você configure perguntas de recuperação e mantenha um método alternativo de autenticação ativo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>As minhas senhas atuais são seguras?</AccordionTrigger>
                  <AccordionContent>
                    O Locklify inclui uma ferramenta de análise de senhas que verifica a força das suas senhas existentes e alerta sobre senhas fracas, reutilizadas ou que apareceram em vazamentos de dados conhecidos, ajudando você a identificar e corrigir vulnerabilidades.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Uma senha diferente para cada conta - comece agora!
              </h2>
              <p className="max-w-[600px] md:text-xl mx-auto opacity-90">
                Não arrisque sua segurança online usando a mesma senha em vários lugares. O Locklify torna fácil usar senhas únicas e fortes para cada serviço.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" variant="secondary" onClick={() => navigate("/register")}>
                Criar Conta Grátis
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/login")}>
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-base font-medium">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Recursos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Preços</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Segurança</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Ajuda</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contato</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Sobre</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Carreiras</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Termos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              <span className="text-lg font-bold">Locklify</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2024 Locklify. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
