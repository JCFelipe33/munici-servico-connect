import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search } from "lucide-react";

const MyRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"history" | "draft">("history");

  const requests = [
    {
      protocol: "33492774",
      type: "Solicitação",
      title: "Iluminação Pública",
      description: "Manifestação enviada, utilize o número de protocolo para acompanhar sua solicitação.",
      status: "pending",
      statusLabel: "Enviado",
      date: "20/05/2024 às 14:30",
    },
    {
      protocol: "55669900",
      type: "Manifestação",
      title: "Limpeza Urbana",
      description: "Manifestação resolvida, utilize o número de protocolo e saiba mais sobre a definição.",
      status: "completed",
      statusLabel: "Resposta definitiva",
      date: "18/05/2024 às 10:15",
    },
    {
      protocol: "55669901",
      type: "Manifestação",
      title: "Iluminação Pública",
      description: "Manifestação resolvida, utilize o número de protocolo e saiba mais sobre a definição.",
      status: "completed",
      statusLabel: "Resposta definitiva",
      date: "15/05/2024 às 16:45",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-status-pending/20 text-status-pending border-status-pending/30";
      case "in-progress":
        return "bg-status-in-progress/20 text-status-in-progress border-status-in-progress/30";
      case "completed":
        return "bg-status-completed/20 text-status-completed border-status-completed/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Minhas manifestações</h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-primary to-primary/90 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "history" ? "secondary" : "ghost"}
              className={activeTab === "history" ? "bg-accent text-accent-foreground" : "text-white hover:bg-white/10"}
              onClick={() => setActiveTab("history")}
            >
              Histórico
            </Button>
            <Button
              variant={activeTab === "draft" ? "secondary" : "ghost"}
              className={activeTab === "draft" ? "bg-accent text-accent-foreground" : "text-white hover:bg-white/10"}
              onClick={() => setActiveTab("draft")}
            >
              Rascunho
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Status Section */}
        <div>
          <h3 className="font-semibold mb-4">Em análise</h3>
          {requests
            .filter((req) => req.status === "pending")
            .map((request) => (
              <Card
                key={request.protocol}
                className="mb-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/request/${request.protocol}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">Protocolo - {request.protocol}</h4>
                      <p className="text-sm text-primary">{request.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <circle cx="8" cy="3" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="13" r="1.5" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {request.description}
                  </p>
                  <Badge className={`${getStatusColor(request.status)} rounded-full px-3 py-1`}>
                    {request.statusLabel}
                  </Badge>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Completed Requests */}
        <div>
          <h3 className="font-semibold mb-4">Solicitações aceitas</h3>
          {requests
            .filter((req) => req.status === "completed")
            .map((request) => (
              <Card
                key={request.protocol}
                className="mb-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/request/${request.protocol}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">Protocolo - {request.protocol}</h4>
                      <p className="text-sm text-primary">{request.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <circle cx="8" cy="3" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="13" r="1.5" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {request.description}
                  </p>
                  <Badge className={`${getStatusColor(request.status)} rounded-full px-3 py-1`}>
                    {request.statusLabel}
                  </Badge>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-accent hover:bg-accent/90"
      >
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MyRequests;
