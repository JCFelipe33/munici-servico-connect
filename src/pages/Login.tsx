import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production this would authenticate with backend
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Cidadão Conectado</h1>
          <p className="text-white/80 text-lg">
            Solicitações de serviços públicos ao seu alcance
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Bem-vindo</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="admin" className="text-sm font-normal cursor-pointer">
                  Acessar como servidor público
                </Label>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Esqueceu sua senha?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/60 text-sm">
          Primeiro acesso?{" "}
          <a href="#" className="text-white hover:underline font-medium">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
