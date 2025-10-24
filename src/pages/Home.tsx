import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Trash2, 
  FileText, 
  ThumbsUp, 
  MessageSquare,
  Menu,
  User,
  Bell
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const serviceCards = [
    {
      title: "Iluminação",
      description: "Poste apagado ou com defeito",
      icon: Lightbulb,
      color: "from-accent to-accent/80",
      action: () => navigate("/new-request?type=lighting"),
    },
    {
      title: "Limpeza",
      description: "Coleta de lixo e limpeza urbana",
      icon: Trash2,
      color: "from-secondary to-secondary/80",
      action: () => navigate("/new-request?type=cleaning"),
    },
    {
      title: "Outras Solicitações",
      description: "Outros tipos de serviços",
      icon: FileText,
      color: "from-primary to-primary/80",
      action: () => navigate("/new-request?type=other"),
    },
    {
      title: "Elogio",
      description: "Reconheça um bom trabalho",
      icon: ThumbsUp,
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/new-request?type=compliment"),
    },
    {
      title: "Reclamação",
      description: "Registre sua insatisfação",
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
      action: () => navigate("/new-request?type=complaint"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Cidadão Conectado</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Agora os serviços públicos estão em suas mãos
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Se manifeste por aqui e acompanhe tudo bem de perto
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-1 text-white">Registrar manifestação</h3>
              <p className="text-white/80 text-sm">
                Atendimento, acesso e ações aos serviços públicos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 -mt-8 pb-8">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {serviceCards.map((service, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 overflow-hidden"
              onClick={service.action}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{service.title}</h4>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Requests Card */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate("/my-requests")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Minhas manifestações</h4>
                  <p className="text-sm text-muted-foreground">
                    Acompanhamento, histórico e rascunho
                  </p>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
