import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Play, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingButton } from "@/components/pricing-button";

const Landing = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setActiveAccordion(activeAccordion === value ? null : value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium border rounded-full bg-primary text-primary-foreground">
                Segurança de primeiro nível
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Locklify
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Gerencie todas as suas senhas com segurança e facilidade. Nunca mais esqueça uma senha ou comprometa sua segurança online.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" onClick={() => navigate("/register")}>
                  Comece Agora - É Grátis
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Já tenho uma conta
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Check className="w-4 h-4 text-primary" />
                <p>Sincronização entre dispositivos</p>
                <Check className="ml-4 w-4 h-4 text-primary" />
                <p>Criptografia de ponta a ponta</p>
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
      <section className="w-full py-12 md:py-24">
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mt-8">
              {/* Free Plan */}
              <Card className="flex flex-col justify-between border-2 h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Gratuito</CardTitle>
                    <div className="inline-block px-3 py-1 text-sm rounded-full bg-muted">Básico</div>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">R$0</span>
                    <span className="ml-1 text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Até 15 senhas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Gerador de senhas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Acesso em 1 dispositivo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <PricingButton className="w-full" variant="outline" plan="basic">
                    Começar Agora
                  </PricingButton>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col justify-between border-2 border-primary relative h-full">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-md">
                  Popular
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Premium</CardTitle>
                    <div className="inline-block px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground">Recomendado</div>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">R$45</span>
                    <span className="ml-1 text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm">
                    Teste gratuito de 15 dias
                  </div>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Senhas ilimitadas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Sincronização em até 5 dispositivos</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Gerador de senhas avançado</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Verificador de violação de dados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Compartilhamento seguro</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <PricingButton className="w-full" plan="premium">
                    Começar Teste Gratuito
                  </PricingButton>
                </CardFooter>
              </Card>

              {/* Lifetime Plan (previously Business Plan) */}
              <Card className="flex flex-col justify-between border-2 h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Vitalício</CardTitle>
                    <div className="inline-block px-3 py-1 text-sm rounded-full bg-muted">Completo</div>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">R$200</span>
                    <span className="ml-1 text-muted-foreground">pagamento único</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Tudo do plano Premium</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Dispositivos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Acesso vitalício a atualizações</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Autenticação de dois fatores avançada</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Relatórios de segurança</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Suporte prioritário</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" onClick={() => navigate("/checkout")}>
                    Comprar Agora
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
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
                  <AccordionTrigger>Posso acessar minhas senhas offline?</AccordionTrigger>
                  <AccordionContent>
                    Sim, uma vez que você tenha feito login, suas senhas são armazenadas localmente de forma segura. Você pode acessá-las mesmo sem conexão com a internet.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como funciona a sincronização entre dispositivos?</AccordionTrigger>
                  <AccordionContent>
                    Quando você adiciona ou atualiza uma senha em um dispositivo, nossa tecnologia sincroniza automaticamente essas alterações em todos os seus dispositivos logados, mantendo tudo atualizado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>O que acontece se eu esquecer minha senha mestra?</AccordionTrigger>
                  <AccordionContent>
                    Por motivos de segurança, não armazenamos sua senha mestra em lugar nenhum. Recomendamos que você configure perguntas de recuperação e mantenha um método alternativo de autenticação ativo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Posso compartilhar senhas com outras pessoas de forma segura?</AccordionTrigger>
                  <AccordionContent>
                    Sim, nos planos Premium e Empresarial você pode compartilhar senhas específicas com outros usuários do Locklify sem comprometer a segurança. O compartilhamento é encriptado e pode ser revogado a qualquer momento.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Como posso migrar de outro gerenciador de senhas?</AccordionTrigger>
                  <AccordionContent>
                    O Locklify oferece ferramentas de importação para os principais gerenciadores de senhas do mercado. Basta exportar suas senhas do seu gerenciador atual e importá-las para o Locklify em poucos cliques.
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
                Pronto para proteger suas senhas?
              </h2>
              <p className="max-w-[600px] md:text-xl mx-auto opacity-90">
                Junte-se a milhares de usuários que já confiam no Locklify para gerenciar suas senhas com segurança.
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
