import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  MessageCircle, 
  Headphones, 
  Sun, 
  PieChart, 
  Calendar, 
  Building2, 
  TrendingUp, 
  Home, 
  DollarSign, 
  Star,
  Copy,
  ArrowLeft
} from "lucide-react";

const ThankYouPurchase = () => {
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Prompt copiado para área de transferência",
    });
  };

  const features = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Morning Call",
      badge: "Automático",
      badgeColor: "bg-green-100 text-green-800",
      description: "Receba análises do mercado todo dia útil entre 9h-10h automaticamente"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Análise de Carteira",
      badge: "3 passos",
      badgeColor: "bg-blue-100 text-blue-800",
      description: (
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Envie foto da carteira ou documento de posição</li>
          <li>Descreva o perfil do cliente</li>
          <li>Peça "Analise essa carteira"</li>
        </ol>
      )
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Relatório Mensal",
      badge: "Mensal",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "Envie seu relatório de performance do último dia útil do mês"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Análise de Ofertas",
      badge: "IPO",
      badgeColor: "bg-orange-100 text-orange-800",
      description: (
        <div className="space-y-1 text-sm">
          <p className="font-medium">Prompts:</p>
          <p className="text-muted-foreground">"Me fale quais ofertas analisadas vocês têm"</p>
          <p className="text-muted-foreground">"Analise a oferta [nome]"</p>
        </div>
      )
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Análise de Ações",
      badge: "Ações",
      badgeColor: "bg-cyan-100 text-cyan-800",
      description: (
        <div className="space-y-1 text-sm">
          <p className="font-medium">Prompts:</p>
          <p className="text-muted-foreground">"Me faça a análise de ação [ticker]"</p>
          <p className="text-muted-foreground">"Me mande o documento da tese da ação [ticker]"</p>
        </div>
      )
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Análise de FIIs",
      badge: "FIIs",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: (
        <div className="space-y-1 text-sm">
          <p className="font-medium">Prompts:</p>
          <p className="text-muted-foreground">"Me faça a análise de FII [ticker]"</p>
          <p className="text-muted-foreground">"Me mande o documento da tese do FII [ticker]"</p>
        </div>
      )
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Dados Financeiros",
      badge: "Cotações",
      badgeColor: "bg-yellow-100 text-yellow-800",
      description: (
        <div className="space-y-1 text-sm">
          <p className="font-medium">Prompt:</p>
          <p className="text-muted-foreground">"Me dê os dados financeiros e cotação de [ticker]"</p>
        </div>
      )
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Carteira Recomendada",
      badge: "Premium",
      badgeColor: "bg-pink-100 text-pink-800",
      description: (
        <div className="space-y-2">
          <p className="text-sm">Solicite ao suporte técnico</p>
          <a
            href="https://wa.me/5521973973673?text=Gostaria%20de%20receber%20a%20carteira%20recomendada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-green-600 hover:text-green-700 font-medium"
          >
            <MessageCircle className="w-3 h-3" />
            Solicitar agora
          </a>
        </div>
      )
    }
  ];

  const promptCategories = [
    {
      category: "Análises",
      prompts: [
        "Me faça a análise de ação PETR4",
        "Me faça a análise de FII HGLG11",
        "Analise a oferta [nome da empresa]"
      ]
    },
    {
      category: "Documentos",
      prompts: [
        "Me mande o documento da tese da ação VALE3",
        "Me mande o documento da tese do FII MXRF11"
      ]
    },
    {
      category: "Dados e Cotações",
      prompts: [
        "Me dê os dados financeiros de ITUB4",
        "Qual a cotação atual de BBAS3?"
      ]
    },
    {
      category: "Carteira",
      prompts: [
        "Vou enviar uma foto da carteira para análise",
        "Me envie o relatório mensal da carteira"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-duop-purple/5 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">🎉 Pagamento Confirmado!</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Bem-vindo à Duop! Vamos começar agora mesmo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <a
            href="https://wa.me/5521967135336?text=Fiz%20o%20pagamento%2C%20me%20explique%20o%20que%20voc%C3%AAs%20fazem%21"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button 
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com a IA Agora
            </Button>
          </a>
          
          <a
            href="https://wa.me/5521973973673?text=Preciso%20de%20ajuda%20com%20minha%20compra"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button 
              size="lg"
              variant="outline"
              className="w-full gap-2"
            >
              <Headphones className="w-5 h-5" />
              Suporte Técnico
            </Button>
          </a>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">📚 Como usar sua assessoria IA</h2>
            <p className="text-muted-foreground">Explore todas as funcionalidades disponíveis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-duop-purple">
                      {feature.icon}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {typeof feature.description === 'string' ? (
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  ) : (
                    feature.description
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Tutorial */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">🎥 Veja como funciona na prática</h2>
            <p className="text-muted-foreground">Tutorial completo de uso da plataforma</p>
          </div>
          
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/JrfYvv90IVE"
              title="Como usar a Duop"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">⚡ Prompts Rápidos</h2>
            <p className="text-muted-foreground">Copie e cole estes prompts no WhatsApp</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {promptCategories.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {category.prompts.map((prompt, promptIndex) => (
                      <div 
                        key={promptIndex}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <code className="text-sm flex-1">{prompt}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(prompt)}
                          className="ml-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Info Box */}
        <Card className="max-w-3xl mx-auto bg-duop-purple/5 border-duop-purple/20">
          <CardHeader>
            <CardTitle className="text-center">✅ Tudo incluído na sua assinatura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Acesso imediato a todas funcionalidades</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Suporte via WhatsApp incluído</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Morning Call automático ativado</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Sem fidelidade - cancele quando quiser</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o site
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ThankYouPurchase;
