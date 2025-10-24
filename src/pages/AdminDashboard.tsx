import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Filter,
  Download,
  Lightbulb,
  Trash2,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const stats = [
    {
      title: "Total de Solicitações",
      value: "1.234",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Em Análise",
      value: "156",
      icon: Clock,
      color: "text-status-pending",
      bgColor: "bg-status-pending/10",
    },
    {
      title: "Em Execução",
      value: "89",
      icon: AlertCircle,
      color: "text-status-in-progress",
      bgColor: "bg-status-in-progress/10",
    },
    {
      title: "Concluídas",
      value: "989",
      icon: CheckCircle2,
      color: "text-status-completed",
      bgColor: "bg-status-completed/10",
    },
  ];

  const recentRequests = [
    {
      protocol: "33492774",
      type: "Iluminação",
      icon: Lightbulb,
      location: "Rua das Flores, Centro",
      date: "24/10/2025 14:30",
      status: "pending",
      statusLabel: "Em análise",
      priority: "Alta",
    },
    {
      protocol: "33492773",
      type: "Limpeza",
      icon: Trash2,
      location: "Av. Principal, Bairro Norte",
      date: "24/10/2025 13:15",
      status: "in-progress",
      statusLabel: "Em execução",
      priority: "Média",
    },
    {
      protocol: "33492772",
      type: "Iluminação",
      icon: Lightbulb,
      location: "Praça da República",
      date: "24/10/2025 11:20",
      status: "completed",
      statusLabel: "Concluída",
      priority: "Baixa",
    },
    {
      protocol: "33492771",
      type: "Limpeza",
      icon: Trash2,
      location: "Rua Comercial, Centro",
      date: "24/10/2025 09:45",
      status: "pending",
      statusLabel: "Em análise",
      priority: "Alta",
    },
    {
      protocol: "33492770",
      type: "Iluminação",
      icon: Lightbulb,
      location: "Av. dos Estados",
      date: "23/10/2025 16:30",
      status: "in-progress",
      statusLabel: "Em execução",
      priority: "Média",
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "Média":
        return "bg-accent/20 text-accent border-accent/30";
      case "Baixa":
        return "bg-secondary/20 text-secondary border-secondary/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Painel Administrativo</h1>
              <p className="text-white/80">Gestão de Solicitações Públicas</p>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Solicitações Recentes
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="lighting">Iluminação</SelectItem>
                    <SelectItem value="cleaning">Limpeza</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Em análise</SelectItem>
                    <SelectItem value="in-progress">Em execução</SelectItem>
                    <SelectItem value="completed">Concluídas</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="default">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Protocolo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((request) => (
                    <TableRow key={request.protocol} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono font-medium">
                        {request.protocol}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-muted">
                            <request.icon className="w-4 h-4" />
                          </div>
                          {request.type}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {request.location}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getPriorityColor(request.priority)} rounded-full`}
                        >
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(request.status)} rounded-full`}
                        >
                          {request.statusLabel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
