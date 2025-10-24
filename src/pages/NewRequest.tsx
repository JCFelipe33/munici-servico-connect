import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Camera, Upload } from "lucide-react";
import { toast } from "sonner";

const NewRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestType = searchParams.get("type") || "lighting";

  const [formData, setFormData] = useState({
    address: "",
    description: "",
    photos: [] as File[],
  });

  const getRequestTitle = () => {
    switch (requestType) {
      case "lighting":
        return "Iluminação Pública";
      case "cleaning":
        return "Limpeza Urbana";
      case "complaint":
        return "Reclamação";
      case "compliment":
        return "Elogio";
      default:
        return "Nova Solicitação";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mock protocol number
    const protocol = Math.floor(10000000 + Math.random() * 90000000);
    toast.success(`Solicitação enviada! Protocolo: ${protocol}`, {
      description: "Você pode acompanhar sua solicitação em 'Minhas manifestações'",
    });
    navigate("/my-requests");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            address: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
          });
          toast.success("Localização capturada com sucesso!");
        },
        (error) => {
          toast.error("Não foi possível obter sua localização");
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">{getRequestTitle()}</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="address" className="text-base font-semibold">
                    Localização
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Usar GPS
                  </Button>
                </div>
                <Input
                  id="address"
                  placeholder="Digite o endereço ou use o GPS"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label htmlFor="description" className="text-base font-semibold">
                  Descrição do problema
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o problema encontrado..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Fotos (opcional)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {formData.photos.length < 4 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
                      <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Adicionar foto
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Você pode adicionar até 4 fotos (máximo 5MB cada)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Upload className="w-5 h-5 mr-2" />
            Enviar Solicitação
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
