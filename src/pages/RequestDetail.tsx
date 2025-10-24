import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Paperclip } from "lucide-react";

const RequestDetail = () => {
  const navigate = useNavigate();
  const { protocol } = useParams();

  const timeline = [
    {
      title: "Início do processo",
      status: "completed",
      section: "Solicitação",
      badge: "Cadastrada",
      description: "Manifestação cadastrada, utilize o número de protocolo para acompanhar.",
      date: "20/05/2024 às 14:30 horas",
      button: "Ver detalhes",
    },
    {
      title: "Atendimento ouvidor",
      status: "in-progress",
      section: "Em andamento",
      badge: "Pedido de complementação de informação",
      description: "Informações adicionais em análise pelo sistema, aguarde retorno em breve teremos uma resposta definitiva para a sua manifestação",
      date: "23/05/2024 às 10:15 horas",
      attachments: ["Documento em anexo", "Documento em anexo"],
      button: "Complementar",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-status-completed";
      case "in-progress":
        return "bg-status-pending";
      default:
        return "bg-muted";
    }
  };

  const getBadgeColor = (badge: string) => {
    if (badge === "Cadastrada") {
      return "bg-primary/20 text-primary border-primary/30";
    }
    return "bg-status-in-progress/20 text-status-in-progress border-status-in-progress/30";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/my-requests")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Protocolo - {protocol}</h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                <circle cx="8" cy="3" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="8" cy="13" r="1.5" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline dot and line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-full ${getStatusColor(item.status)} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  {item.status === "completed" ? (
                    <Calendar className="w-6 h-6 text-white" />
                  ) : (
                    <MapPin className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Content Card */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">{item.section}</p>
                      <Badge className={`${getBadgeColor(item.badge)} rounded-full px-3 py-1`}>
                        {item.badge}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {item.attachments && (
                      <div className="space-y-2 mb-3">
                        {item.attachments.map((attachment, i) => (
                          <a
                            key={i}
                            href="#"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Paperclip className="w-4 h-4" />
                            {attachment}
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mb-3">{item.date}</p>

                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                    >
                      {item.button}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
